import { handleQueryErrors } from '$lib/utils/errorHandling';
import type { Category } from '$lib/types/databaseTypes';
import { query, form } from '$app/server';
import { sql } from '$lib/server/postgres';
import * as z from 'zod';
import { zString } from '$lib/types/schemaTypes';

export const getCategories = query(async () => {
	try {
		return await sql<Category[]>`SELECT * FROM categories`;
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const createCategory = form(z.object({ name: zString }), async ({ name }) => {
	try {
		return await sql`INSERT INTO categories (name) VALUES (${name}) RETURNING id`;
	} catch (e) {
		handleQueryErrors(e);
	}
});
