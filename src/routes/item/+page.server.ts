import { getItemsFullInfo } from '$lib/remote/item.remote';
import { getQuantityTrend } from '$lib/remote/transaction.remote';

export async function load() {
	return {
		items: await getItemsFullInfo(),
		quantityTrends: await getQuantityTrend()
	};
}
