import { form, getRequestEvent, query } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { DB_Stock, IncomingTransaction } from '$lib/types/databaseTypes';
import { master, zNumber, zString } from '$lib/types/schemaTypes';
import type { CompleteIncomingTransaction, TransactionItem } from '$lib/types/types';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { invalid } from '@sveltejs/kit';
import { isBefore } from 'date-fns';
import * as z from 'zod';
import { getOrCreateSupplier } from './supplier.remote';

export const createIncomingTransaction = form(
	z
		.object({
			date: z.iso.date(),
			supplier: zString,
			deliveryID: zString,
			ids: z.array(master, 'Please add an item.'),
			quantities: z.array(zNumber.min(1, 'Quantity must be at least 1.'))
		})
		.refine((obj) => isBefore(obj.date, new Date()), {
			error: 'Date cannot be in the future.',
			path: ['date']
		}),
	async ({ date, supplier, deliveryID, ids, quantities }, issue) => {
		const { locals } = getRequestEvent();
		try {
			await sql.begin(async () => {
				const supplierResult = await getOrCreateSupplier(supplier);
				if (!supplierResult)
					throw new Error('createIncomingTransaction: Supplier result is undefined');

				const [transactionResult] = await sql<{ id: string }[]>`
					INSERT INTO incoming_transactions(
					logger_id, created_at, delivery_date, supplier_id, delivery_ref)
					VALUES(${locals.user.id}, ${new Date()}, ${date}, ${supplierResult.id}, ${deliveryID}) RETURNING id`;

				const items = generateDB_StockArray(ids, quantities, transactionResult.id);

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
								issue.deliveryID(
									`This delivery order has already been logged. Verify it's the right supplier & DO, or you can edit the existing one.`
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
			expender: zString,
			remarks: z.string().trim(),
			ids: z.array(master, 'Please add an item.'),
			quantities: z.array(zNumber.min(1, 'Quantity must be at least 1.'))
		})
		.refine((obj) => isBefore(obj.date, new Date()), {
			error: 'Date cannot be in the future.',
			path: ['date']
		}),
	async ({ date, expender, remarks, ids, quantities }) => {
		const { locals } = getRequestEvent();
		try {
			await sql.begin(async () => {
				const [transactionResult] = await sql<{ id: string }[]>`
					INSERT INTO outgoing_transactions(
					logger_id, created_at, expend_date, expender, remarks)
					VALUES(${locals.user.id}, ${new Date()}, ${date}, ${expender}, ${remarks}) RETURNING id`;

				const items = generateDB_StockArray(ids, quantities, transactionResult.id);

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
		const result = await sql<IncomingTransaction[]>`
		SELECT inc_t.id, 
			inc_t.created_at AS "createdAt", 
			inc_t.delivery_date AS "deliveryDate", 
			s.name AS "supplier", 
			inc_t.delivery_ref AS "deliveryID",
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
		ON inc_t.supplier_id = s.id`;
		const sortedTransactions = sortTransactions(result);
		return sortedTransactions;
	} catch (e) {
		handleQueryErrors(e);
	}
});

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

function sortTransactions(transactions: IncomingTransaction[]): CompleteIncomingTransaction[] {
	if (transactions.length === 0) return [];
	let newID = transactions[0].id;
	const sortedList: CompleteIncomingTransaction[] = [];
	const sortedTransactions: TransactionItem[] = [];
	transactions.forEach(
		({ id, createdAt, deliveryDate, supplier, deliveryID, itemID, master, itemName, quantity }) => {
			if (id !== newID) {
				sortedList.push({
					id,
					createdAt,
					deliveryDate,
					supplier,
					deliveryID,
					items: sortedTransactions.slice()
				});
				console.log(JSON.stringify(sortedList, null, 2));
				sortedTransactions.length = 0;
				newID = id;
				console.log(JSON.stringify(sortedList, null, 2));
			}
			const newTransactionItem = { id: itemID, master, name: itemName, quantity };
			sortedTransactions.push(newTransactionItem);
		}
	);
	return sortedList;
}
