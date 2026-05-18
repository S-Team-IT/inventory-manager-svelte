<script lang="ts">
	import type { Item } from '$lib/types/databaseTypes.js';

	const { data } = $props();
	type SortOption =
		| 'master'
		| 'masterReverse'
		| 'name'
		| 'nameReverse'
		| 'category'
		| 'categoryReverse'
		| 'quantity'
		| 'quantityReverse';

	let sortOption = $state<SortOption>('master');
	let sortedItems = $derived.by(() => {
		switch (sortOption) {
			case 'master':
				return sortItems(data.items, 'master');
			case 'masterReverse':
				return sortItems(data.items, 'master', true);
			case 'name':
				return sortItems(data.items, 'name');
			case 'nameReverse':
				return sortItems(data.items, 'name', true);
			case 'category':
				return sortItems(data.items, 'category');
			case 'categoryReverse':
				return sortItems(data.items, 'category', true);
			case 'quantity':
				return sortItems(data.items, 'quantity');
			case 'quantityReverse':
				return sortItems(data.items, 'quantity', true);
		}
	});

	function sortItems(
		list: Item[],
		property: 'master' | 'name' | 'category' | 'quantity',
		isReverse = false
	): Item[] {
		if (isReverse)
			return list.toSorted((a, b) => String(b[property]).localeCompare(String(a[property])));
		return list.toSorted((a, b) => String(a[property]).localeCompare(String(b[property])));
	}

	let selectedItems = $state();
</script>

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
			{@render row(item)}
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
		{#if sortOption === option}
			↓
		{:else if sortOption === optionReverse}
			↑
		{/if}
	</button>
{/snippet}

{#snippet row({ master, name, category, thumbnail, photos, quantity }: Item)}
	<tr class="hover:bg-base-300">
		<th
			><input
				type="checkbox"
				bind:group={selectedItems}
				value={master}
				onchange={(e) => {
					const element = e.target as HTMLInputElement;
					if (element.checked) {
						element.parentElement?.parentElement?.classList.add('bg-base-300');
					} else {
						element.parentElement?.parentElement?.classList.remove('bg-base-300');
					}
				}}
			/></th
		>
		<th class="w-25 text-2xl">{master}</th>
		<th class="flex w-50 items-center justify-center">
			<button
				onclick={() => {
					const dialog = document.querySelector(`#modal${master}`);
					(dialog as HTMLDialogElement).showModal();
				}}><img src={thumbnail} alt="thumbnail" loading="lazy" /></button
			>
			{#if photos.length != 0}{/if}
			<dialog id={`modal${master}`} class="modal">
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
