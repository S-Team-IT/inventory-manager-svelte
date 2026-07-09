import { getCategories } from '$lib/remote/category.remote.js';
import { getItemFullInfo } from '$lib/remote/item.remote.js';

export async function load({ params }) {
	return {
		item: await getItemFullInfo(params.slug),
		categories: await getCategories()
	};
}
