import { getQuantityTrendTimeline } from '$lib/remote/item.remote';

export async function load() {
	const trendTimeline = await getQuantityTrendTimeline();
	if (!trendTimeline) throw new Error('getQuantityTrendTimeline returned undefined');

	return {
		timeline: trendTimeline
	};
}
