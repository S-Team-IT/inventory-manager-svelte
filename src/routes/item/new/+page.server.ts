import { getItems } from '$lib/remote/item.remote';
import { getCategories } from '$lib/remote/category.remote';
import { getSuppliers } from '$lib/remote/supplier.remote';

export async function load() {
	return {
		items: await getItems(),
		categories: await getCategories(),
		suppliers: await getSuppliers()
	};
}
