import { getItemsFullInfo } from '$lib/remote/item.remote';
import type { DetailedItem } from '$lib/types/databaseTypes';

export async function load() {
	const items: DetailedItem[] | undefined = await getItemsFullInfo();
	if (!items) throw new Error('getItemsFullInfo returned undefined');
	return {
		items
	};
}
