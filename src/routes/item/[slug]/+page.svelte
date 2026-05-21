<script lang="ts">
	import { resolve } from '$app/paths';
	import ItemCard from '$lib/components/itemCard.svelte';

	const { data } = $props();
</script>

<div class="breadcrumbs text-sm">
	<ul>
		<li><a href={resolve('/item')}>Item List</a></li>
		<li>Add Item</li>
	</ul>
</div>

{#if !data.item}
	404 not found
{:else}
	<div class="max-w-75">
		<ItemCard {...data.item} />
	</div>
{/if}
