<script lang="ts">
	import ItemCard from '$lib/components/itemCard.svelte';

	const { data } = $props();
	$inspect(data.item);
</script>

{#if !data.item}
	404 not found
{:else}
	<ItemCard {...data.item} />
{/if}
