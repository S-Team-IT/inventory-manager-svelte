import { getIncomingTransaction, getOutgoingTransaction } from '$lib/remote/transaction.remote.js';
import type { CompleteTransaction } from '$lib/types/databaseTypes';
import { error } from '@sveltejs/kit';

export async function load({ locals, params, url }) {
	if (
		!locals.user ||
		!(
			locals.user.role === 'Procurement' ||
			locals.user.role === 'Admin' ||
			locals.user.role === 'Project'
		)
	) {
		error(403, 'Forbidden');
	}

	const transactionType = url.searchParams.get('type');
	let transaction: CompleteTransaction;

	if (
		transactionType === 'incoming' &&
		(locals.user.role === 'Procurement' || locals.user.role === 'Admin')
	) {
		transaction = await getIncomingTransaction(params.slug);
	} else if (
		transactionType === 'outgoing' &&
		(locals.user.role === 'Project' || locals.user.role === 'Admin')
	) {
		transaction = await getOutgoingTransaction(params.slug);
	} else {
		error(403, 'Forbidden or bad request');
	}

	return { transaction, isIncoming: transactionType === 'incoming' };
}
