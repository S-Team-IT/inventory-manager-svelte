<script lang="ts">
	import { resolve } from '$app/paths';
	import QuantityChart from '$lib/components/quantityChart.svelte';
	import type { DetailedItem, Item } from '$lib/types/databaseTypes.js';
	import { genericSort, numberSort } from '$lib/utils/arraySort.js';
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
		switch (sortOption) {
			case 'lastStocked':
				return list.toSorted((a, b) =>
					numberSort(b.lastStocked.getTime(), a.lastStocked.getTime())
				);
			default:
				break;
		}

		let property: string = '';
		if (sortOption.includes('Reverse')) {
			property = sortOption.slice(0, -7) as keyof Item;
			return list.toSorted((b, a) =>
				// @ts-expect-error this works but it skips ts's checking
				genericSort(a[property], b[property])
			);
		} else {
			property = sortOption as keyof Item;
			return list.toSorted((a, b) =>
				// @ts-expect-error this works but it skips ts's checking
				genericSort(a[property], b[property])
			);
		}
	}
</script>

<svelte:head>
	<title>Master List</title>
</svelte:head>

<div class="filter-buttons-group">
	<button
		class="btn btn-primary {sortOption === 'lastStocked' ? '' : 'btn-soft'} "
		onclick={() => {
			sortOption = 'lastStocked';
		}}
		>Last Stocked
	</button>
</div>

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
	minimumQuantity,
	disabled
}: DetailedItem)}
	<tr class={disabled ? 'line-through opacity-50' : 'hover:bg-base-300 '}>
		<td class="w-25 text-center text-4xl">#{master}</td>
		<td>
			<div class="flex w-50 items-center justify-center">
				<ImageModal id={master} thumbnailSrc={thumbnail} gallerySrc={gallery} />
			</div>
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
				<QuantityChart
					chartData={data.quantityTrends.get(id)?.toReversed()}
					targetElementID={`chart${id}`} />
			</td>
		{/if}
	</tr>
{/snippet}
