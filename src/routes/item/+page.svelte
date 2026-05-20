<script lang="ts">
	import type { Item } from '$lib/types/databaseTypes.js';
	import { SvelteSet } from 'svelte/reactivity';

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
		| 'lastChangedReverse';

	let sortOption = $state<SortOption>('lastChangedReverse');
	let sortedItems = $derived.by(() => sortItems(data.items, sortOption));

	function sortItems(list: Item[], sortOption: SortOption): Item[] {
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

	let selectedItems = new SvelteSet<string>();
</script>

<button
	class="btn {sortOption === 'lastChangedReverse' ? '' : 'btn-soft'} ms-4 btn-primary"
	onclick={() => {
		sortOption = 'lastChangedReverse';
	}}>Last changed</button
>

<table class="table max-w-200">
	<thead>
		<tr>
			<th></th>
			<th class="w-25">
				{@render sortingHeader('master', 'masterReverse', 'Master')}
			</th>
			<th class="w-50">Photos</th>
			<th>
				{@render sortingHeader('name', 'nameReverse', 'Name')}
			</th>
			<th>{@render sortingHeader('category', 'categoryReverse', 'Category')}</th>
			<th>{@render sortingHeader('quantity', 'quantityReverse', 'Qty')}</th>
		</tr>
	</thead>
	<tbody>
		{#each sortedItems as item (item.id)}
			{@render ItemRow(item, selectedItems)}
		{/each}
	</tbody>
</table>

{#snippet sortingHeader(option: SortOption, optionReverse: SortOption, head: string)}
	<button
		onclick={() => {
			if (sortOption === option) sortOption = optionReverse;
			else sortOption = option;
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

{#snippet ItemRow(
	{ masterNumber, name, category, thumbnail, photos, quantity }: Item,
	selectedItems: SvelteSet<string>
)}
	<tr class="hover:bg-base-300">
		<th
			><input
				type="checkbox"
				onchange={(e) => {
					const element = e.target as HTMLInputElement;
					if (element.checked) {
						element.parentElement?.parentElement?.classList.add('bg-base-300');
						selectedItems.add(masterNumber);
					} else {
						element.parentElement?.parentElement?.classList.remove('bg-base-300');
						selectedItems.delete(masterNumber);
					}
				}}
			/></th
		>
		<th class="w-25 text-2xl">{masterNumber}</th>
		<th class="flex w-50 items-center justify-center">
			<button
				onclick={() => {
					const dialog = document.querySelector(`#modal${masterNumber}`);
					(dialog as HTMLDialogElement).showModal();
				}}><img src={thumbnail} alt="thumbnail" loading="lazy" /></button
			>
			{#if photos.length != 0}{/if}
			<dialog id={`modal${masterNumber}`} class="modal">
				<div class="modal-box">
					<form method="dialog">
						<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
					</form>
					<h3 class="text-lg font-bold">{name} gallery</h3>
					<div class="grid grid-cols-3 gap-2">
						<img src={thumbnail} alt="thumbnail" loading="lazy" />
						{#each photos as { item }, i (i)}
							<img src={item} alt={`photo #${i}`} loading="lazy" />
						{/each}
					</div>
				</div>
				<form method="dialog" class="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</th>
		<th>{name}</th>
		<th>{category}</th>
		<th>{quantity}</th>
	</tr>
{/snippet}
