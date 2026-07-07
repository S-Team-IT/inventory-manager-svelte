import { form, getRequestEvent, query } from '$app/server';
import { sql } from '$lib/server/postgres';
import type {
	CompleteTransaction,
	DB_Stock,
	IndividualTransaction,
	Item,
	QuantityTimeline,
	WeekCumulativeQuantity,
	WeeklyNetQuantity
} from '$lib/types/databaseTypes';
import { master, zBoolean, zNumber, zString } from '$lib/types/schemaTypes';
import { formatMonthDay, isBeforeToday } from '$lib/utils/dateFns';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { error, invalid } from '@sveltejs/kit';
import z from 'zod';
import { updateMultipleLastStocked } from './item.remote';
import { getOrCreateSupplier } from './supplier.remote';

export const createIncomingTransaction = form(
	z
		.object({
			purchaseRef: z.string().trim(),
			date: z.iso.date(),
			supplier: zString,
			deliveryRef: z.string().trim(),
			invoiceRef: z.string().trim(),
			ids: z.array(master, 'Please add an item.'),
			quantities: z.array(zNumber.min(1, 'Quantity must be at least 1.'))
		})
		.refine((obj) => isBeforeToday(obj.date), {
			error: 'Date cannot be in the future.',
			path: ['date']
		}),
	async ({ purchaseRef, date, supplier, deliveryRef, invoiceRef, ids, quantities }, issue) => {
		const { locals } = getRequestEvent();
		if (!locals.user) error(403, 'Forbidden');

		try {
			await sql.begin(async () => {
				const supplierResult = await getOrCreateSupplier(supplier);
				if (!supplierResult)
					throw new Error('createIncomingTransaction: Supplier result is undefined');

				const [transactionResult] = await sql<{ id: string }[]>`
					INSERT INTO incoming_transactions(
					logger_id, created_at, delivery_date, supplier_id, delivery_ref, purchase_ref, invoice_ref)
					VALUES(${locals.user!.id}, ${new Date()}, ${date}, ${supplierResult.id}, ${deliveryRef}, ${purchaseRef}, ${invoiceRef}) RETURNING id`;

				const items = generateDB_StockArray(ids, quantities, transactionResult.id);
				await updateMultipleLastStocked(ids);

				await sql`INSERT INTO incoming_items ${sql(items)}`;
				return;
			});
			return { success: true };
		} catch (e) {
			handleQueryErrors(e, (postgresError) => {
				if (postgresError.code === '23505') {
					switch (postgresError.constraint_name) {
						case 'incoming_transactions_supplier_id_delivery_ref_key':
							invalid(
								issue.deliveryRef(
									`This delivery order has already been logged. Verify it's the right supplier & DO.`
								)
							);
					}
				}
			});
		}
	}
);

export const createOutgoingTransaction = form(
	z
		.object({
			date: z.iso.date(),
			expender: z.string().trim(),
			remarks: z.string().trim(),
			ids: z.array(master, 'Please add an item.'),
			quantities: z.array(zNumber.min(1, 'Quantity must be at least 1.'))
		})
		.refine((obj) => isBeforeToday(obj.date), {
			error: 'Date cannot be in the future.',
			path: ['date']
		}),
	async ({ date, expender, remarks, ids, quantities }) => {
		const { locals } = getRequestEvent();
		if (!locals.user) error(403, 'Forbidden');
		try {
			await sql.begin(async () => {
				const [transactionResult] = await sql<{ id: string }[]>`
					INSERT INTO outgoing_transactions(
					logger_id, created_at, expend_date, expender, remarks)
					VALUES(${locals.user!.id}, ${new Date()}, ${date}, ${expender}, ${remarks}) RETURNING id`;
				const items = generateDB_StockArray(ids, quantities, transactionResult.id);

				await updateMultipleLastStocked(ids);
				await sql`INSERT INTO outgoing_items ${sql(items)}`;
				return;
			});
			return { success: true };
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);

export const getIncomingTransactions = query(async () => {
	try {
		const result = await sql<IndividualTransaction[]>`
		SELECT inc_t.id,
			inc_t.created_at AS "createdAt",
			inc_t.delivery_date AS "deliveryDate",
			s.name AS "supplier",
			inc_t.delivery_ref AS "deliveryRef",
			i.master_number AS master,
			inc_i.item_id AS "itemID",
			i.name AS "itemName",
			inc_i.quantity
		FROM incoming_transactions inc_t
		JOIN incoming_items inc_i
		ON inc_t.id = inc_i.transaction_id
		JOIN items i
		ON inc_i.item_id = i.id
		JOIN suppliers s
		ON inc_t.supplier_id = s.id
		ORDER BY inc_t.created_at DESC, i.id ASC`;
		return sortTransactions(result);
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const getOutgoingTransactions = query(async () => {
	try {
		const result = await sql<IndividualTransaction[]>`
		SELECT out_t.id,
			out_t.created_at AS "createdAt",
			out_t.expend_date AS "expendDate",
			out_t.expender,
			out_t.remarks,
			i.master_number AS "master",
			i.id AS "itemID",
			i.name AS "itemName",
			out_i.quantity
		FROM outgoing_transactions out_t
		JOIN outgoing_items out_i
		ON out_t.id = out_i.transaction_id
		JOIN items i
		ON out_i.item_id = i.id
		ORDER BY out_t.created_at DESC, i.id ASC`;
		return sortTransactions(result);
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const getAllTransactions = query(async () => {
	try {
		//Returns a table with the attributes of both incoming & outgoing
		const result = await sql`
	SELECT
       inc_t.id,
       u.name              AS "logger",
       inc_t.created_at    AS "createdAt",
       inc_t.delivery_date AS "date",
       true                AS incoming,
       s.name              AS supplier,
       null                AS expender,
       inc_t.delivery_ref  AS "deliveryRef",
       null                AS remarks,
       inc_i.item_id       AS "itemID",
       i.name              AS "itemName",
       inc_i.quantity
     FROM incoming_transactions inc_t
     JOIN incoming_items        inc_i ON inc_t.id = inc_i.transaction_id
     JOIN suppliers             s     ON inc_t.supplier_id = s.id
     JOIN users                 u     ON inc_t.logger_id = u.id
     JOIN items                 i     ON inc_i.item_id = i.id

     UNION ALL

     SELECT
         out_t.id,
         u.name,
         out_t.created_at,
         out_t.expend_date,
         false,
         null,
         out_t.expender,
         null,
         out_t.remarks,
         out_i.item_id,
         i.name,
         out_i.quantity
     FROM outgoing_transactions out_t
     JOIN outgoing_items        out_i ON out_t.id = out_i.transaction_id
     JOIN users                 u     ON out_t.logger_id = u.id
     JOIN items                 i     ON out_i.item_id = i.id

     ORDER BY "createdAt" DESC;`;
		return result;
	} catch (e) {
		handleQueryErrors(e);
	}
});

// Transforms the data to match table schema for insertion
function generateDB_StockArray(
	itemIDs: string[],
	quantities: number[],
	transactionID: string
): DB_Stock[] {
	const items: DB_Stock[] = [];
	itemIDs.forEach((id, i) => {
		items[i] = {
			transaction_id: transactionID,
			item_id: id,
			quantity: quantities[i]
		};
	});
	return items;
}

// see sortQuantityTrendTimeline() for a cleaner version.
// Groups incoming/outgoing_items together by their transactionID.
function sortTransactions(transactions: IndividualTransaction[]): CompleteTransaction[] {
	if (transactions.length === 0) return [];
	let count: number = -1;
	let currentID: string = '';
	const completeList: CompleteTransaction[] = [];

	for (let i = 0; i < transactions.length; i++) {
		const {
			id,
			createdAt,
			deliveryDate,
			supplier,
			deliveryRef,
			expendDate,
			expender,
			remarks,
			itemID,
			master,
			itemName,
			quantity
		} = transactions[i];
		const item: Item = { id: itemID, master, name: itemName, quantity };

		if (id !== currentID) {
			count++;
			currentID = id;
			if (deliveryDate) {
				completeList[count] = {
					id,
					createdAt,
					deliveryDate,
					supplier,
					deliveryRef,
					items: [item]
				};
			} else {
				completeList[count] = {
					id,
					createdAt,
					expendDate,
					expender,
					remarks,
					items: [item]
				};
			}
		} else {
			completeList[count].items.push(item);
		}
	}

	return completeList;
}

export const deleteTransaction = form(
	z.object({ id: zString, isIncoming: zBoolean }),
	async ({ id, isIncoming }) => {
		try {
			let result;
			if (isIncoming) {
				result = await sql`DELETE FROM incoming_transactions WHERE id = ${id}`;
			} else {
				result = await sql`DELETE FROM outgoing_transactions WHERE id = ${id}`;
			}
			if (result.count !== 1) {
				return { success: false, message: 'Transaction not found.' };
			}
			return { success: true };
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);

export const getQuantityTrend = query(async () => {
	try {
		const result = await sql<WeeklyNetQuantity[]>`
		SELECT 
			id AS "itemID", 
			week_starting AS week, 
			cumulative_net_quantity AS "netQuantity" 
		FROM quantity_trend`;
		return sortWeeklyNetQuantity(result);
	} catch (e) {
		handleQueryErrors(e);
	}
});

// see sortQuantityTrendTimeline() for a cleaner version.
// Groups the weekly balance of each item by the itemID.
function sortWeeklyNetQuantity(list: WeeklyNetQuantity[]) {
	if (list.length === 0) return;
	let currentItemID: string = '';
	const trends = new Map();

	for (let i = 0; i < list.length; i++) {
		const { itemID, week, netQuantity } = list[i];
		if (currentItemID !== itemID) {
			currentItemID = itemID;
			trends.set(itemID, [{ week, netQuantity }]);
		} else {
			const temp = trends.get(itemID);
			trends.set(itemID, [...temp, { week, netQuantity }]);
		}
	}
	return trends;
}

export const getQuantityTrendTimeline = query(async () => {
	try {
		const result: WeekCumulativeQuantity[] = await sql<
			WeekCumulativeQuantity[]
		>`SELECT id, master_number AS "master", name, week_starting AS week, cumulative_net_quantity AS quantity FROM quantity_trend_timeline`;
		return sortQuantityTrendTimeline(result);
	} catch (e) {
		handleQueryErrors(e);
	}
});

// Groups each entry in the database query by something.
// In this case, groups the weekly balance of each item by the itemID.
function sortQuantityTrendTimeline(list: WeekCumulativeQuantity[]) {
	const timeline: QuantityTimeline = {};
	for (const { id, master, name, week, quantity } of list) {
		const dateString = formatMonthDay(week);
		if (!timeline[id]) timeline[id] = [];
		timeline[id].push({ master, name, week: dateString, quantity });
	}
	return timeline;
}
