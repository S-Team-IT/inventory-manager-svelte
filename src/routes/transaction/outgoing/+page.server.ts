import { getOutgoingTransactions } from '$lib/remote/transaction.remote';

export async function load() {
	const transactions = await getOutgoingTransactions();
	if (!transactions) throw new Error('getOutgoingTransactions returned undefined');
	return {
		transactions
	};
}
