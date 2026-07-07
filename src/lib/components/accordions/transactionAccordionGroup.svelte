<script lang="ts">
	import type { CompleteTransaction } from '$lib/types/databaseTypes';
	import { formatYearMonthDayDash } from '$lib/utils/dateFns';
	import TransactionAccordion from './transactionAccordion.svelte';

	type Props = {
		transactions: CompleteTransaction[];
	};

	const { transactions }: Props = $props();
</script>

{#each transactions as transaction, i (i)}
	{@const isIncoming = !transaction.expendDate}
	{@const elementID = `confirm-modal${transaction.id}-${formatYearMonthDayDash(transaction.createdAt)}`}
	<TransactionAccordion {transaction} {isIncoming} {elementID} />
{/each}
