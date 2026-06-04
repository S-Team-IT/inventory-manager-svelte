import { getCategories } from '$lib/remote/category.remote.js';
import { getItemFullInfo } from '$lib/remote/item.remote.js';
// import { getSuppliers } from '$lib/remote/supplier.remote.js';

export async function load({ params }) {
	const item = await getItemFullInfo(params.slug);
	if (!item) throw new Error('getItemFullInfo item undefined');
	const categories = await getCategories();
	if (!categories) throw new Error('getItemFullInfo categories undefined');
	// const suppliers = await getSuppliers();
	// if (!suppliers) throw new Error('getItemFullInfo suppliers undefined');

	return {
		item,
		categories
		// suppliers
	};
}
