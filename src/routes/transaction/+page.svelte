<script lang="ts">
	import TransactionAccordion from '$lib/components/transactionAccordion.svelte';

	const { data } = $props();
</script>

<div class="m-10"><TransactionAccordion transactions={data.transactions} /></div>
