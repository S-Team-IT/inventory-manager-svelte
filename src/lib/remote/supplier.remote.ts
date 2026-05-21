import { query, form } from '$app/server';
import type { Supplier } from '$lib/types/databaseTypes';
import { sql } from '$lib/server/postgres';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import * as z from 'zod';
import { zString } from '$lib/types/schemaTypes';

export const getSuppliers = query(async () => {
	try {
		return await sql<Supplier[]>`SELECT * FROM suppliers`;
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const createCategory = form(z.object({ name: zString }), async ({ name }) => {
	try {
		return await sql`INSERT INTO suppliers (name) VALUES (${name}) RETURNING id`;
	} catch (e) {
		handleQueryErrors(e);
	}
});
