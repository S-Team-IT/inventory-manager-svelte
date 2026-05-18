import { handleQueryErrors } from '$lib/utils/errorHandling';
import type { Category } from '$lib/types/databaseTypes';
import { query } from '$app/server';
import { sql } from '$lib/server/postgres';

export const getCategories = query(async () => {
	try {
		return await sql<Category[]>`SELECT * FROM categories`;
	} catch (e) {
		handleQueryErrors(e);
	}
});
