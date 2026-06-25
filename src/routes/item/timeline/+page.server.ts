import { getQuantityTrendTimeline } from '$lib/remote/transaction.remote';

export async function load() {
	const trendTimeline = await getQuantityTrendTimeline();
	if (!trendTimeline) throw new Error('getQuantityTrendTimeline returned undefined');

	return {
		timeline: trendTimeline
	};
}
