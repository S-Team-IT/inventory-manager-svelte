import { getUser } from '$lib/remote/user.remote.js';
import { error } from '@sveltejs/kit';

export async function load({ locals, params }) {
	const userID = locals.user?.id || '-1';
	if (userID !== params.slug) error(403, 'Forbidden');
}
