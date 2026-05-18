import { query } from '$app/server';
import type { Supplier } from '$lib/types/databaseTypes';
import { sql } from '$lib/server/postgres';
import { handleQueryErrors } from '$lib/utils/errorHandling';

export const getSuppliers = query(async () => {
	try {
		return await sql<Supplier[]>`SELECT * FROM suppliers`;
	} catch (e) {
		handleQueryErrors(e);
	}
});
