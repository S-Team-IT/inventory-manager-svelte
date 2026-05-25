import { form, getRequestEvent } from '$app/server';
import { master, zNumber, zString } from '$lib/types/schemaTypes';
import * as z from 'zod';

export const createTransaction = form(
	z.object({
		date: z.iso.date().max(new Date().getTime()),
		supplier: zString,
		deliveryID: zString,
		masters: z.array(master, 'Please add an item.'),
		quantities: z.array(zNumber.min(1, 'Quantity must be at least 1.'))
	}),
	async ({ date, supplier, deliveryID, masters, quantities }) => {
		const { locals } = getRequestEvent();
		console.log(date, supplier, deliveryID, masters, quantities, locals.user.id);
	}
);
