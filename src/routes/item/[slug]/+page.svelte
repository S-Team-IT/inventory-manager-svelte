<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Item } from '$lib/types/databaseTypes.js';

	const { data } = $props();
	let { master, name, category, categoryID, supplier, supplierID, quantity }: Item = $derived(
		data.item
	);
</script>

<div class="breadcrumbs text-sm">
	<ul>
		<li><a href={resolve('/')} class="underline">Home</a></li>
		<li><a href={resolve('/item')} class="underline">Item List</a></li>
		<li>Add Item</li>
	</ul>
</div>

{#if !data.item}
	404 not found
{:else}
	<div class="max-w-75">
		<h1>{name}</h1>
		<h2>{master}</h2>
		<select name="" id="">
			<option value={categoryID}>{category}</option>
		</select>
		<select name="" id="">
			<option value={supplierID}>{supplier}</option>
		</select>
		<p>{quantity}</p>
	</div>
{/if}
