import { query } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { Item } from '$lib/types/databaseTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';

export const getItems = query(async () => {
	try {
		return await sql`SELECT
      id,
      name,
      category_id AS "categoryID",
      supplier_id AS "supplierID",
      thumbnail,
      photos
      FROM items`;
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const getItemsFullInfo = query(async () => {
	try {
		return await sql<Item[]>`SELECT
       i.id,
       i.name,
       c.name AS "category",
       i.category_id AS "categoryID",
       s.name AS "supplier",
       i.supplier_id AS "supplierID",
       i.thumbnail,
       i.photos
       FROM items i
       JOIN categories c ON i.category_id = c.id
       JOIN suppliers s ON i.supplier_id = s.id`;
	} catch (e) {
		handleQueryErrors(e);
	}
});
