import { getItems } from '$lib/remote/item.remote';

export async function load() {
	const items = await getItems();
	return {
		items
	};
}
