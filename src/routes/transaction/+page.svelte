<script lang="ts">
	import TransactionAccordionGroup from '$lib/components/accordions/transactionAccordionGroup.svelte';

	const { data } = $props();

	let isTransactionsReversed = $state<boolean>(true);
	let transactionsReversed = $derived(data.transactions.toReversed());
	let transactionsToDisplay = $derived(
		isTransactionsReversed ? transactionsReversed : data.transactions
	);

	function toggleTransactionsReversed() {
		isTransactionsReversed = !isTransactionsReversed;
	}
</script>

<svelte:head>
	<title>Transactions</title>
</svelte:head>

<div class="filter-buttons-group">
	<button class="btn btn-primary" onclick={toggleTransactionsReversed}>
		Date <span class={isTransactionsReversed ? 'icon-[mdi--arrow-up]' : 'icon-[mdi--arrow-down]'}
		></span>
	</button>
</div>
<div class="m-10"><TransactionAccordionGroup transactions={transactionsToDisplay} /></div>
