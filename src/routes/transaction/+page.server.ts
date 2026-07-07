import { getIncomingTransactions, getOutgoingTransactions } from '$lib/remote/transaction.remote';

export async function load() {
	return {
		incomingTransactions: await getIncomingTransactions(),
		outgoingTransactions: await getOutgoingTransactions()
	};
}
