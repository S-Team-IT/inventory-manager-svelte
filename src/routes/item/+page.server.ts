import { getItemsFullInfo, getQuantityTrend } from '$lib/remote/item.remote';
import type { DetailedItem, Trends } from '$lib/types/databaseTypes';

export async function load() {
	const items: DetailedItem[] | undefined = await getItemsFullInfo();
	if (!items) throw new Error('getItemsFullInfo returned undefined');
	const quantityTrends: Trends | undefined = await getQuantityTrend();
	if (!items) throw new Error('getQuantityTrend returned undefined');

	return {
		items,
		quantityTrends
	};
}
