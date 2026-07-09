import { getQuantityTrendTimeline } from '$lib/remote/transaction.remote';

export async function load() {
	return {
		timeline: await getQuantityTrendTimeline()
	};
}
