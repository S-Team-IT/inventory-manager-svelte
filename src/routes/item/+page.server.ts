import { getItemsFullInfo } from '$lib/remote/item.remote';
import type { Item } from '$lib/types/databaseTypes';

export async function load() {
	const items: Item[] | undefined = await getItemsFullInfo();
	return {
		items
	};
}
