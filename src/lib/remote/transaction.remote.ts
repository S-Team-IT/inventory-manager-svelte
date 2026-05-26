import { form, getRequestEvent } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { DB_Stock } from '$lib/types/databaseTypes';
import { master, zNumber, zString } from '$lib/types/schemaTypes';
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
function generateDB_StockArray(
	itemIDs: string[],
	quantities: number[],
	transactionID: string
): DB_Stock[] {
	const items: DB_Stock[] = [];
	itemIDs.forEach((id, i) => {
		items[i] = {
			incoming_id: transactionID,
			item_id: id,
			quantity: quantities[i]
		};
	});
	return items;
}
