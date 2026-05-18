import { query } from '$app/server';
import type { Item } from '$lib/types/databaseTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { sql } from '$lib/server/postgres';

export const getItems = query(async () => {
	try {
		return await sql<Item[]>`SELECT * FROM items`;
	} catch (e) {
		handleQueryErrors(e);
	}
});
