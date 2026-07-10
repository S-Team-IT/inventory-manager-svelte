import { getIncomingTransaction, getOutgoingTransaction } from '$lib/remote/transaction.remote.js';
import type { CompleteTransaction } from '$lib/types/databaseTypes';
import { error } from '@sveltejs/kit';

export async function load({ locals, params, url }) {
	if (!locals.user || !(locals.user.role === 'Procurement' || locals.user.role === 'Admin'))
		error(403, 'Forbidden');

	const transactionType = url.searchParams.get('type');
	let transaction: CompleteTransaction;

	if (transactionType === 'incoming' && locals.user.role === 'Procurement') {
		transaction = await getIncomingTransaction(params.slug);
	} else if (transactionType === 'outgoing' && locals.user.role === 'Project') {
		transaction = await getOutgoingTransaction(params.slug);
	} else {
		error(400, 'Bad request');
	}

	return { transaction, isIncoming: transactionType === 'incoming' };
}
