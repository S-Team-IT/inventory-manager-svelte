import { form, query } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { Category, Item, Supplier } from '$lib/types/databaseTypes';
import { master, zBoolean, zImgFile, zNumber, zString } from '$lib/types/schemaTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { error } from '@sveltejs/kit';
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

export const getItemFullInfo = query(zString, async (id) => {
	try {
		const result = await sql<Item[]>`SELECT
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
			JOIN suppliers s ON i.supplier_id = s.id
			WHERE i.id = ${id}`;
		if (result.count !== 1) error(404, 'Item not found.');
		return result[0];
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const createItem = form(
	z.object({
		master,
		name: zString.min(1, 'Name cannot be empty.'),
		category: zString.min(1, 'Category cannot be empty.'),
		supplier: zString.min(1, 'Supplier cannot be empty.'),
		quantity: zNumber,
		thumbnail: zImgFile,
		photos: z.array(zImgFile),
		isDisabled: zBoolean
	}),
	async ({
		master,
		name,
		category,
		supplier,
		quantity
		// thumbnail,
		// photos,
		// isDisabled = false
	}) => {
		const thumbnailStr = 'http://dummyimage.com/173x100.png/dddddd/000000';
		const photosArray = [
			{ item: 'http://dummyimage.com/108x100.png/ff4444/ffffff' },
			{ item: 'http://dummyimage.com/116x100.png/dddddd/000000' },
			{ item: 'http://dummyimage.com/182x100.png/cc0000/ffffff' },
			{ item: 'http://dummyimage.com/239x100.png/ff4444/ffffff' },
			{ item: 'http://dummyimage.com/194x100.png/cc0000/ffffff' }
		];
		try {
			const newItem = await sql.begin(async (sql) => {
				const [categoryResult] = await sql<Category[]>`
				WITH i AS(
					INSERT INTO categories (name) VALUES (${category}) 
					ON CONFLICT(name) DO NOTHING
					RETURNING id
				)
				SELECT id FROM i
				UNION ALL
				SELECT id FROM categories WHERE name = ${category}
				LIMIT 1;`;

				const [supplierResult] = await sql<Supplier[]>`
				WITH i AS(
					INSERT INTO suppliers (name) VALUES (${supplier}) 
					ON CONFLICT(name) DO NOTHING
					RETURNING id
				)
				SELECT id FROM i
				UNION ALL
				SELECT id FROM suppliers WHERE name = ${supplier}
				LIMIT 1;`;

				const [itemResult] = await sql<Item[]>`
				WITH i AS (
					INSERT INTO items 
					(master_number, name, category_id, supplier_id, quantity, thumbnail, photos)
					VALUES(
					${master}, 
					${name}, 
					${categoryResult.id}, 
					${supplierResult.id}, 
					${quantity}, 
					${thumbnailStr},
					${sql.json(photosArray)})
					RETURNING *
				)
				SELECT i.master_number AS "master",
				i.id,
				i.name,
				c.name AS "category",
				c.id AS "categoryID",
				s.name AS "supplier",
				s.id AS "supplierID",
				i.quantity,
				i.thumbnail,
				i.photos
				FROM i 
				JOIN categories c ON i.category_id = c.id 
				JOIN suppliers s ON i.supplier_id = s.id;`;

				return itemResult;
			});

			return { success: true, item: newItem };
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);

export const deleteItem = form(z.object({ master }), async ({ master }) => {
	try {
		const result = await sql`DELETE FROM items WHERE master_number = ${master}`;
		if (result.count !== 0) return { success: false };
		return { success: true };
	} catch (e) {
		handleQueryErrors(e);
	}
});
