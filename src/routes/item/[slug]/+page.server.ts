import { getItemFullInfo } from '$lib/remote/item.remote.js';

export async function load({ params }) {
	const item = await getItemFullInfo(params.slug);
	if (!item) throw new Error('getItemFullInfo returned undefined');

	return {
		item
	};
}
