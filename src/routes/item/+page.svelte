<script lang="ts">
	import { resolve } from '$app/paths';
	import QuantityChart from '$lib/components/quantityChart.svelte';
	import type { DetailedItem, Item } from '$lib/types/databaseTypes.js';
	import ImageModal from '../../lib/components/imageModal.svelte';

	const { data } = $props();
	type SortOption =
		| 'master'
		| 'masterReverse'
		| 'name'
		| 'nameReverse'
		| 'category'
		| 'categoryReverse'
		| 'quantity'
		| 'quantityReverse'
		| 'lastStocked'
		| 'minimumQuantity'
		| 'minimumQuantityReverse';

	let sortOption = $state<SortOption>('lastStocked');
	let sortedItems = $derived.by(() => sortItems(data.items, sortOption));

	function sortItems(list: DetailedItem[], sortOption: SortOption): DetailedItem[] {
		if (sortOption === 'lastStocked') {
			return list.toSorted((a, b) => b.lastStocked.getTime() - a.lastStocked.getTime());
		} else if (sortOption === 'minimumQuantity') {
			return list.toSorted(
				(a, b) => a.quantity / a.minimumQuantity - b.quantity / b.minimumQuantity
			);
		} else if (sortOption === 'minimumQuantityReverse') {
			return list.toSorted(
				(a, b) => b.quantity / b.minimumQuantity - a.quantity / a.minimumQuantity
			);
		}

		if (sortOption.includes('Reverse')) {
			const property = sortOption.slice(0, -7) as keyof Item;
			return list.toSorted((a, b) =>
				String(b[property]).localeCompare(String(a[property]), 'en', {
					sensitivity: 'base',
					numeric: true
				})
			);
		} else {
			const property = sortOption as keyof Item;
			return list.toSorted((a, b) =>
				String(a[property]).localeCompare(String(b[property]), 'en', {
					sensitivity: 'base',
					numeric: true
				})
			);
		}
	}
</script>

<svelte:head>
	<title>Master List</title>
</svelte:head>

<button
	class="btn {sortOption === 'lastStocked' ? '' : 'btn-soft'} ms-4 btn-primary"
	onclick={() => {
		sortOption = 'lastStocked';
	}}>Last Stocked</button
>

<table class="table max-w-200">
	<thead>
		<tr>
			<th class="w-25 text-center">
				{@render sortingHeader('master', 'masterReverse', 'Master')}
			</th>
			<th class="w-50">Photos</th>
			<th>
				{@render sortingHeader('name', 'nameReverse', 'Name')}
			</th>
			<th>{@render sortingHeader('category', 'categoryReverse', 'Category')}</th>
			<th class="text-center">{@render sortingHeader('quantity', 'quantityReverse', 'Qty')}</th>
			<th>{@render sortingHeader('minimumQuantity', 'minimumQuantityReverse', 'Fullfilment')}</th>
		</tr>
	</thead>
	<tbody>
		{#each sortedItems as item (item.id)}
			{@render ItemRow(item)}
		{/each}
	</tbody>
</table>

{#snippet sortingHeader(option: SortOption, optionReverse: SortOption, head: string)}
	<button
		onclick={() => {
			sortOption = sortOption === option ? optionReverse : option;
		}}
		>{head}
		<span class="text-white">
			{#if sortOption === option}
				↓
			{:else if sortOption === optionReverse}
				↑
			{/if}
		</span>
	</button>
{/snippet}

{#snippet ItemRow({
	id,
	master,
	name,
	category,
	thumbnail,
	gallery,
	quantity,
	minimumQuantity
}: DetailedItem)}
	<tr class="hover:bg-base-300">
		<td class="w-25 text-center text-4xl">#{master}</td>
		<td class="flex w-50 items-center justify-center">
			<ImageModal id={master} thumbnailSrc={thumbnail} gallerySrc={gallery} />
		</td>
		<td class="max-w-50 wrap-break-word">
			<a href={resolve('/item/[slug]', { slug: id })} class="underline">{name}</a>
		</td>
		<td>{category}</td>
		<td class="text-center">{quantity || 0} </td>
		<td>{quantity | 0} / {minimumQuantity}</td>
		{#if data.quantityTrends?.get(id)}
			<td>
				<div><canvas id={`chart${id}`}></canvas></div>
				<QuantityChart chartData={data.quantityTrends?.get(id)} targetElementID={`chart${id}`} />
			</td>
		{/if}
	</tr>
{/snippet}
