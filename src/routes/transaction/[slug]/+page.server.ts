import { getIncomingTransaction, getOutgoingTransaction } from '$lib/remote/transaction.remote.js';
import type { Transaction } from '$lib/types/databaseTypes';
import { error } from '@sveltejs/kit';

export async function load({ locals, params, url }) {
	if (!locals.user || !(locals.user.role === 'Procurement' || locals.user.role === 'Admin'))
		error(403, 'Forbidden');

	const transactionType = url.searchParams.get('type');
	let transaction: Transaction;
	switch (transactionType) {
		case 'incoming':
			transaction = await getIncomingTransaction(params.slug);
			break;
		case 'outgoing':
			transaction = await getOutgoingTransaction(params.slug);
			break;
		default:
			error(400, 'Bad request');
	}

	return { transaction, isIncoming: transactionType === 'incoming' };
}
