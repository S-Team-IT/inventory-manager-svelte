<script lang="ts">
	import type { Item } from '$lib/types/databaseTypes.js';

	const { data } = $props();
	type SortOption =
		| 'master'
		| 'masterReverse'
		| 'name'
		| 'nameReverse'
		| 'category'
		| 'categoryReverse';
	let sortOption = $state<SortOption>('master');
	let sortedItems = $derived.by(() => {
		switch (sortOption) {
			case 'master':
				return data.items?.toSorted((a, b) => a.id - b.id);
			case 'masterReverse':
				return data.items?.toSorted((a, b) => b.id - a.id);
			case 'name':
				return data.items?.toSorted((a, b) => a.name.localeCompare(b.name));
			case 'nameReverse':
				return data.items?.toSorted((a, b) => b.name.localeCompare(a.name));
			case 'category':
				return data.items?.toSorted((a, b) => a.category.localeCompare(b.category));
			case 'categoryReverse':
				return data.items?.toSorted((a, b) => b.category.localeCompare(a.category));
		}
	});
</script>

<table class="table max-w-200">
	<thead>
		<tr>
			<th class="w-25">
				{@render sortingHeader('master', 'masterReverse', 'Name')}
			</th>
			<th class="w-50">Photos</th>
			<th>
				{@render sortingHeader('name', 'nameReverse', 'Name')}
			</th>
			<th>{@render sortingHeader('category', 'categoryReverse', 'Name')}</th>
			<th>Quantity</th>
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

{#snippet row({ id, name, category, thumbnail, photos }: Item)}
	<tr class="hover:bg-base-300">
		<th class="w-25 text-2xl">{id}</th>
		<th class="flex w-50 items-center justify-center">
			<button
				onclick={() => {
					const dialog = document.querySelector(`#modal${id}`);
					(dialog as HTMLDialogElement).showModal();
				}}><img src={thumbnail} alt="thumbnail" loading="lazy" /></button
			>
			{#if photos.length != 0}{/if}
			<dialog id={`modal${id}`} class="modal">
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
	</tr>
{/snippet}
