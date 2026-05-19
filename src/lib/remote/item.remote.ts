import { query } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { Item } from '$lib/types/databaseTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { form } from '$app/server';
import * as z from 'zod';
import { zString, masterNumber, zNumber, zImgFile, zBoolean } from '$lib/types/schemaTypes';

export const getItems = query(async () => {
	try {
		return await sql`SELECT
      id,
      master_number AS "master",
      name,
      category_id AS "categoryID",
      supplier_id AS "supplierID",
      thumbnail,
      photos,
      quantity,
      last_changed AS "lastChanged"
      FROM items`;
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const getItemsFullInfo = query(async () => {
	try {
		return await sql<Item[]>`SELECT
       i.id,
       i.master_number AS "master",
       i.name,
       c.name AS "category",
       i.category_id AS "categoryID",
       s.name AS "supplier",
       i.supplier_id AS "supplierID",
       i.thumbnail,
       i.photos,
       i.quantity,
       i.last_changed AS "lastChanged"
       FROM items i
       JOIN categories c ON i.category_id = c.id
       JOIN suppliers s ON i.supplier_id = s.id`;
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const createItem = form(
	z.object({
		masterNumber,
		name: zString.min(1, 'Name cannot be empty.'),
		category: zString.min(1, 'Category cannot be empty.'),
		supplier: zString.min(1, 'Supplier cannot be empty.'),
		quantity: zNumber,
		thumbnail: zImgFile,
		photos: z.array(zImgFile),
		isDisabled: zBoolean
	}),
	async ({
		masterNumber,
		name,
		category,
		supplier,
		quantity,
		thumbnail,
		photos,
		isDisabled = false
	}) => {
		console.log(masterNumber, name, category, supplier, quantity, thumbnail, photos, isDisabled);
  }
);
