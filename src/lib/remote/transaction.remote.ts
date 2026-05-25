import { form } from '$app/server';
import { master, zNumber, zString } from '$lib/types/schemaTypes';
import * as z from 'zod';

export const createTransaction = form(
	z.object({
		date: z.iso.date(),
		supplier: zString,
		id: zString,
		masters: z.array(master),
		quantities: z.array(zNumber)
	}),
	async ({ date, supplier, id, masters, quantities }) => {
		console.log(date, supplier, id, masters, quantities);
	}
);
