import { getItemsFullInfo } from '$lib/remote/item.remote';

export async function load() {
	const items = await getItemsFullInfo();
	return {
		items
	};
}
