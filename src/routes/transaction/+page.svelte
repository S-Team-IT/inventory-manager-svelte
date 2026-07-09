<script lang="ts">
	import TransactionAccordionGroup from '$lib/components/accordions/transactionAccordionGroup.svelte';
	import { numberSort } from '$lib/utils/transforms/arrays.js';

	const { data } = $props();

	let isTransactionsReversed = $state<boolean>(true);
	const allTransactions = $derived(
		[...data.incomingTransactions, ...data.outgoingTransactions].toSorted((a, b) => {
			const aTime = (a.deliveryDate || a.expendDate)!.getTime();
			const bTime = (b.deliveryDate || b.expendDate)!.getTime();
			return numberSort(aTime, bTime);
		})
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
		Date <span class={isTransactionsReversed ? 'icon-[mdi--arrow-up]' : 'icon-[mdi--arrow-down]'}>
		</span>
	</button>
</div>
<div class="m-10"><TransactionAccordionGroup transactions={allTransactions} /></div>
