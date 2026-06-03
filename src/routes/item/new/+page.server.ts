import { getItems } from '$lib/remote/item.remote';
import { getCategories } from '$lib/remote/category.remote';
import { getSuppliers } from '$lib/remote/supplier.remote';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || !['Admin', 'QS'].includes(locals.user.role)) error(403, 'Forbidden');

	return {
		items: await getItems(),
		categories: await getCategories(),
		suppliers: await getSuppliers()
	};
}
