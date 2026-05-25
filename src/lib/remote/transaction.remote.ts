import { form, getRequestEvent } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { DB_Stock } from '$lib/types/databaseTypes';
import { master, zNumber, zString } from '$lib/types/schemaTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import * as z from 'zod';
import { getOrCreateSupplier } from './supplier.remote';

export const createIncomingTransaction = form(
	z.object({
		date: z.iso.date().max(new Date().getTime()),
		supplier: zString,
		deliveryID: zString,
		ids: z.array(master, 'Please add an item.'),
		quantities: z.array(zNumber.min(1, 'Quantity must be at least 1.'))
	}),
	async ({ date, supplier, deliveryID, ids, quantities }) => {
		const { locals } = getRequestEvent();
		try {
			const newDeliveryOrder = await sql.begin(async () => {
				const supplierResult = await getOrCreateSupplier(supplier);
				if (!supplierResult)
					throw new Error('createIncomingTransaction: Supplier result is undefined');

				const [transactionResult] = await sql<{ id: string }[]>`
					INSERT INTO incoming_transactions(
					logger_id, created_at, delivery_date, supplier_id, delivery_ref)
					VALUES(${locals.user.id}, ${new Date()}, ${date}, ${supplierResult.id}, ${deliveryID}) RETURNING id`;

				const items: DB_Stock[] = [];
				ids.forEach((id, i) => {
					items[i] = {
						incoming_id: transactionResult.id,
						item_id: id,
						quantity: quantities[i]
					};
				});
				console.log(items);
				await sql`INSERT INTO incoming_items ${sql(items)}`;
				return;
			});
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);
