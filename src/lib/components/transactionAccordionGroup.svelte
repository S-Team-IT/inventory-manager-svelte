<script lang="ts">
	import type { CompleteTransaction } from '$lib/types/databaseTypes';
	import { formatYearMonthDay } from '$lib/utils/dateTransform';
	import TransactionAccordion from './transactionAccordion.svelte';

	type Props = {
		transactions: CompleteTransaction[];
	};

	const { transactions }: Props = $props();
</script>

{#each transactions as transaction, i (i)}
	{@const isIncoming = !transaction.expendDate}
	{@const uniqueID = `confirm-modal${transaction.id}-${formatYearMonthDay(transaction.createdAt)}`}
	<TransactionAccordion {transaction} {isIncoming} {uniqueID} />
{/each}
