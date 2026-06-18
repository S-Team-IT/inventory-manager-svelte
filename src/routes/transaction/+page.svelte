<script lang="ts">
	import TransactionAccordionGroup from '$lib/components/transactionAccordionGroup.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Transactions</title>
</svelte:head>

<div class="m-10"><TransactionAccordionGroup transactions={data.transactions} /></div>
