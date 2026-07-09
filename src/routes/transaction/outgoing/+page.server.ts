import { getOutgoingTransactions } from '$lib/remote/transaction.remote';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!(locals.user?.role === 'Admin' || locals.user?.role === 'Project')) error(403, 'Forbidden');

	return {
		transactions: await getOutgoingTransactions()
	};
}
