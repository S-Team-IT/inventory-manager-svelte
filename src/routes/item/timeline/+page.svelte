<script lang="ts">
	import { localeCompareSort } from '$lib/utils/arraySort.js';
	import { tableToCSV } from '$lib/utils/tableToCSV.js';
	import { toast } from 'svelte-sonner';

	const { data } = $props();
	let isReverse = $state<boolean>(true);
	let isNameHidden = $state<boolean>(true);

	//Iterates through the first item to retrieve each week's date.
	const dates = $derived.by(() => {
		const itemIDs = Object.keys(data.timeline);
		if (itemIDs.length === 0) return undefined;
		const firstID = itemIDs[0];
		return data.timeline[firstID].map((week) => week);
	});

	const sortedTimeline = $derived.by(() => {
		const list = Object.entries(data.timeline);
		return list.toSorted((a, b) => localeCompareSort(a[1][0].master, b[1][0].master));
	});

	function exportTable() {
		const table = document.querySelector('#timeline-table');
		if (!table) {
			toast.error('No table found');
			return;
		}
		tableToCSV(table, 'export');
	}

	function toggleReverse() {
		isReverse = !isReverse;
	}

	function toggleNameColumn() {
		isNameHidden = !isNameHidden;
	}
</script>

<button onclick={exportTable} class="btn btn-primary">Export table</button>
<button onclick={toggleReverse} class="btn btn-primary"
	>Showing by {isReverse ? 'latest' : 'last'}</button
>
<button onclick={toggleNameColumn} class="btn btn-primary"
	>{isNameHidden ? 'Hide' : 'Show'} name</button
>
<table class="table mt-5" id="timeline-table">
	<thead>
		<tr>
			<th class="sticky top-0 z-20 bg-amber-500 text-black">Master</th>
			{#if !isNameHidden}
				<th class="sticky top-0 z-20 bg-amber-500 text-black">Name</th>
			{/if}

			{#if isReverse}
				{#each dates!.toReversed() as { week } (week)}
					<th scope="col" class="sticky top-0 z-20 bg-amber-500 text-black">{week}</th>
				{/each}
			{:else}
				{#each dates as { week } (week)}
					<th scope="col" class="sticky top-0 z-20 bg-amber-500 text-black">{week}</th>
				{/each}
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each sortedTimeline as [, nameDateQuant], i (i)}
			<tr>
				<th class="sticky left-0 z-10 bg-blue-500 text-white">{nameDateQuant[0].master}</th>
				{#if !isNameHidden}
					<td>{nameDateQuant[0].name}</td>
				{/if}
				{#if isReverse}
					{#each nameDateQuant.toReversed() as { quantity }, i (i)}
						<td>{quantity}</td>
					{/each}{:else}
					{#each nameDateQuant as { quantity }, i (i)}
						<td>{quantity}</td>
					{/each}
				{/if}
			</tr>
		{/each}
	</tbody>
</table>
