import { command, form, query } from '$app/server';
import { sql } from '$lib/server/postgres';
import type { DetailedItem } from '$lib/types/databaseTypes';
import { master, zBoolean, zImgFile, zNumber, zString } from '$lib/types/schemaTypes';
import { handleQueryErrors } from '$lib/utils/errorHandling';
import { error, invalid } from '@sveltejs/kit';
import * as z from 'zod';
import { getOrCreateCategory } from './category.remote';
import { getOrCreateSupplier } from './supplier.remote';
import { uploadImage } from './upload.remote';

export const getItems = query(async () => {
	try {
		return await sql`SELECT
			id,
			master_number AS "master",
			name,
			category_id AS "categoryID",
			supplier_id AS "supplierID",
			thumbnail,
			gallery,
			initial_quantity AS "quantity",
			last_stocked AS "lastStocked"
			FROM items`;
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const getItemsFullInfo = query(async () => {
	try {
		return await sql<DetailedItem[]>`SELECT
			i.id,
			i.master_number AS "master",
			i.name,
			c.name AS "category",
			i.category_id AS "categoryID",
			s.name AS "supplier",
			i.supplier_id AS "supplierID",
			i.thumbnail,
			i.gallery,
			q.net AS "quantity",
			i.last_stocked AS "lastStocked"
			FROM items i
			JOIN categories c ON i.category_id = c.id
			JOIN suppliers s ON i.supplier_id = s.id
			LEFT OUTER JOIN net_quantity q ON i.id = q.item_id`;
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const getItemFullInfo = query(zString, async (id) => {
	try {
		const result = await sql<DetailedItem[]>`SELECT
			i.id,
			i.master_number AS "master",
			i.name,
			c.name AS "category",
			i.category_id AS "categoryID",
			s.name AS "supplier",
			i.supplier_id AS "supplierID",
			i.thumbnail,
			i.gallery,
			q.net AS "quantity",
			i.last_stocked AS "lastStocked"
			FROM items i
			JOIN categories c ON i.category_id = c.id
			JOIN suppliers s ON i.supplier_id = s.id
			LEFT OUTER JOIN net_quantity q ON i.id = q.item_id
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
		gallery: z.array(zImgFile).default([]),
		thumbnailUrl: zString,
		galleryUrls: z.array(zString).default([]),
		isDisabled: zBoolean
	}),
	async ({
		master,
		name,
		category,
		supplier,
		quantity,
		thumbnailUrl,
		galleryUrls,
		isDisabled = false
	}) => {
		try {
			const galleryUrlsObj = galleryUrls.map((url) => {
				return { item: url };
			});

			const newItem = await sql.begin(async (sql) => {
				const categoryResult = await getOrCreateCategory(category);
				const supplierResult = await getOrCreateSupplier(supplier);

				if (!categoryResult || !supplierResult)
					throw new Error('Create Item: Category or Supplier result is undefined');

				const [itemResult] = await sql<DetailedItem[]>`
				WITH i AS (
					INSERT INTO items
					(master_number, name, category_id, supplier_id, initial_quantity, thumbnail, gallery, disabled)
					VALUES(
					${master},
					${name},
					${categoryResult.id},
					${supplierResult.id},
					${quantity},
					${thumbnailUrl},
					${sql.json(galleryUrlsObj)},
					${isDisabled})
					RETURNING *
				)
				SELECT i.master_number AS "master",
				i.id,
				i.name,
				c.name AS "category",
				c.id AS "categoryID",
				s.name AS "supplier",
				s.id AS "supplierID",
				i.initial_quantity AS "quantity",
				i.thumbnail,
				i.gallery
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

export const editMaster = form(z.object({ id: zString, master }), async ({ id, master }, issue) => {
	try {
		const result = await sql`UPDATE items SET master_number = ${master} WHERE id = ${id}`;
		if (result.count !== 1) invalid(issue.master('Failed to update.'));
		return { success: true };
	} catch (e) {
		// Check if deletedItems is present
		handleQueryErrors(e);
	}
});

export const editName = form(
	z.object({ id: zString, name: zString }),
	async ({ id, name }, issue) => {
		try {
			const result = await sql`UPDATE items SET name = ${name} WHERE id = ${id}`;
			if (result.count !== 1) invalid(issue.name('Failed to update.'));
			return { success: true };
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);

export const editCategory = form(
	z.object({ id: zString, category: zString }),
	async ({ id, category }, issue) => {
		try {
			const updatedItem = await sql.begin(async (sql) => {
				const categoryResult = await getOrCreateCategory(category);
				if (!categoryResult) throw new Error('editCategory: Category result is unde');

				return await sql`UPDATE items SET category_id = ${categoryResult.id} WHERE id = ${id}`;
			});

			if (updatedItem.count !== 1) invalid(issue.category('Failed to update'));
			return { success: true };
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);

export const editSupplier = form(
	z.object({ id: zString, supplier: zString }),
	async ({ id, supplier }, issue) => {
		try {
			const updatedItem = await sql.begin(async (sql) => {
				const supplierResult = await getOrCreateSupplier(supplier);
				if (!supplierResult) throw new Error('editSupplier: Supplier result is undefined');

				const itemResult =
					await sql`UPDATE items SET supplier_id = ${supplierResult.id} WHERE id = ${id}`;
				return itemResult;
			});

			if (updatedItem.count !== 1) invalid(issue.supplier('Failed to update'));
			return { success: true };
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);

export const editThumbnail = form(
	z.object({ id: zString, thumbnail: zImgFile }),
	async ({ id, thumbnail }, issue) => {
		try {
			const url = await uploadImage({ file: thumbnail, name: `thumbnail_${id}` });
			if (!url) throw new Error('uploadImage did not return url but did not throw an error');

			const result = await sql`UPDATE items SET thumbnail = ${url} WHERE id = ${id}`;
			if (result.count !== 1) invalid(issue.thumbnail('Failed to update'));
			return { success: true };
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);

export const editGallery = form(
	z.object({ id: zString, gallery: z.array(zImgFile) }),
	async ({ id, gallery }, issue) => {
		try {
			const galleryUrls: { item: string }[] = [];
			for (const [i, file] of gallery.entries()) {
				const url = await uploadImage({ file, name: `gallery_${id}_${i}` });
				if (!url) throw new Error('uploadImage did not return url but did not throw an error');
				galleryUrls.push({ item: url });
			}

			const result =
				await sql`UPDATE items SET gallery = ${sql.json(galleryUrls)} WHERE id = ${id}`;
			if (result.count !== 1) invalid(issue.gallery('Failed to update'));
			return { success: true };
		} catch (e) {
			handleQueryErrors(e);
		}
	}
);

export const getItemNameByMaster = query(zString, async (master) => {
	try {
		const result = await sql<
			{
				id: string;
				name: string;
			}[]
		>`SELECT id, name FROM items WHERE master_number = ${master}`;
		if (result.count !== 1) return undefined;
		return result[0];
	} catch (e) {
		handleQueryErrors(e);
	}
});

export const updateMultipleLastStocked = command(z.array(zString), async (ids) => {
	try {
		const result = await sql`
		UPDATE items i
		SET last_stocked = ${Date.now()} 
		WHERE i.id = ANY(${ids}::int[])
		`;
		console.log(result);
		return result;
	} catch (e) {
		handleQueryErrors(e);
	}
});
