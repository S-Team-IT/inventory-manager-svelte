import { getItem } from '$lib/remote/item.remote.js';

export async function load({ params }) {
	const item = await getItem(params.slug);

	return {
		item
	};
}
