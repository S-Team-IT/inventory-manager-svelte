<script lang="ts">
	import TransactionAccordion from '$lib/components/transactionAccordion.svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Transactions</title>
</svelte:head>

<div class="m-10"><TransactionAccordion transactions={data.transactions} /></div>
