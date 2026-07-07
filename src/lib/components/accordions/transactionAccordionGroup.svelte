<script lang="ts">
	import type { CompleteTransaction } from '$lib/types/databaseTypes';
	import TransactionAccordion from './transactionAccordion.svelte';

	type Props = {
		transactions: CompleteTransaction[];
	};

	const { transactions }: Props = $props();
</script>

{#each transactions as transaction, i (i)}
	{@const isIncoming = !transaction.expendDate}
	{@const elementID = `confirm-modal${transaction.id}-${Date.now()}`}
	<TransactionAccordion {transaction} {isIncoming} {elementID} />
{/each}
