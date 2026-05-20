import { form, query } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { Category, Item, Supplier } from '$lib/types/databaseTypes';
import { masterNumber, zBoolean, zImgFile, zNumber, zString } from '$lib/types/schemaTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import * as z from 'zod';

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

		const [categoryResult] = await sql<
			Category[]
		>`INSERT INTO categories (name) VALUES (${category}) ON CONFLICT(name) DO UPDATE SET name = EXCLUDED.name RETURNING *`;
		const [supplierResult] = await sql<
			Supplier[]
		>`INSERT INTO suppliers (name) VALUES (${supplier}) ON CONFLICT(name) DO UPDATE SET name = EXCLUDED.name RETURNING *;`;

		const thumbnailStr = 'http://dummyimage.com/173x100.png/dddddd/000000';
		const photosArray = [
			{ item: 'http://dummyimage.com/108x100.png/ff4444/ffffff' },
			{ item: 'http://dummyimage.com/116x100.png/dddddd/000000' },
			{ item: 'http://dummyimage.com/182x100.png/cc0000/ffffff' },
			{ item: 'http://dummyimage.com/239x100.png/ff4444/ffffff' },
			{ item: 'http://dummyimage.com/194x100.png/cc0000/ffffff' }
		];

		const [itemResult] = await sql<Item[]>`
		WITH i AS (
			INSERT INTO items 
			(master_number, name, category_id, supplier_id, quantity, thumbnail, photos)
			VALUES(
			${masterNumber}, 
			${name}, 
			${categoryResult.id}, 
			${supplierResult.id}, 
			${quantity}, 
			${thumbnailStr},
			${JSON.stringify(photosArray)})
			RETURNING *
		)
		SELECT i.master_number AS "masterNumber",
		i.name,
		c.name AS "category",
		c.id AS "categoryID",
		s.name AS "supplier",
		s.id AS "supplierID",
		i.quantity
		FROM i 
		JOIN categories c ON i.category_id = c.id 
		JOIN suppliers s ON i.supplier_id = s.id
`;
		console.log(itemResult);

		return { success: true, item: itemResult };
	}
);
