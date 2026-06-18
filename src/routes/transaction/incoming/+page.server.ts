import { getSuppliers } from '$lib/remote/supplier.remote';
import { getIncomingTransactions } from '$lib/remote/transaction.remote';
import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || !['Admin', 'Project'].includes(locals.user.role)) error(403, 'Forbidden');

	const suppliers = await getSuppliers();
	if (!suppliers) throw new Error('getSuppliers returned undefined');
	const transactions = await getIncomingTransactions();
	if (!transactions) throw new Error('getIncomingTransactions returned undefined');

	return {
		suppliers,
		transactions
	};
}
