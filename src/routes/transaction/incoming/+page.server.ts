import { getSuppliers } from '$lib/remote/supplier.remote';
import { getIncomingTransactions } from '$lib/remote/transaction.remote';
import { checkRole } from '$lib/utils/checkRole.js';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || !['Admin', 'Procurement'].includes(locals.user.role)) error(403, 'Forbidden');


	return {
		suppliers: await getSuppliers(),
		transactions: await getIncomingTransactions()
	};
}
