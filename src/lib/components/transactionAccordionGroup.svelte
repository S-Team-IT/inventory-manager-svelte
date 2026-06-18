<script lang="ts">
	import type { CompleteTransaction } from '$lib/types/databaseTypes';
	import { format } from 'date-fns';
	import TransactionAccordion from './transactionAccordion.svelte';

	type Props = {
		transactions: CompleteTransaction[];
	};

	const { transactions }: Props = $props();
</script>

{#each transactions as transaction, i (i)}
	{@const isIncoming = !transaction.expendDate}
	{@const uniqueID = `confirm-modal${transaction.id}-${format(transaction.createdAt, 'yyyy-MM-dd')}`}
	<TransactionAccordion {transaction} {isIncoming} {uniqueID} />
{/each}
