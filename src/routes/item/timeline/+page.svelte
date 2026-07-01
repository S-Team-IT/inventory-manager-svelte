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
		const dateList = data.timeline[firstID].map((week) => week);
		//Database returns 1 extra week at the start, so gotta remove it
		dateList.splice(0, 1);
		return dateList;
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

<div class="mt-5 ml-5 space-x-2">
	<button onclick={toggleReverse} class="btn btn-primary">
		Date
		{#if isReverse}
			<span class="icon-[mdi--arrow-left]"></span>
		{:else}
			<span class="icon-[mdi--arrow-right]"></span>
		{/if}
	</button>
	<button onclick={toggleNameColumn} class="btn btn-primary"
		>Name
		{#if isNameHidden}
			<span class="icon-[mdi--hide]"></span>
		{:else}
			<span class="icon-[mdi--show]"></span>
		{/if}
	</button>
	<button onclick={exportTable} class="btn btn-secondary" aria-label="export"
		><span class="icon-[uil--export]"></span></button>
</div>

<table class="table mt-5" id="timeline-table">
	<thead>
		<tr>
			<th class="sticky top-0 z-20 bg-[#2a9d8f] text-white">Master</th>
			{#if !isNameHidden}
				<th class="sticky top-0 z-20 bg-[#2a9d8f] text-white">Name</th>
			{/if}

			{#if isReverse}
				{#each dates!.toReversed() as { week } (week)}
					<th scope="col" class="sticky top-0 z-20 bg-[#2a9d8f] text-white">{week}</th>
				{/each}
			{:else}
				{#each dates as { week } (week)}
					<th scope="col" class="sticky top-0 z-20 bg-[#2a9d8f] text-white">{week}</th>
				{/each}
			{/if}
		</tr>
	</thead>
	<tbody>
		{#each sortedTimeline as [, nameDateQuant], i (i)}
			<!-- Database returns 1 extra week at the start, so gotta remove it -->
			<!-- Can't just mutate the original because then it keeps splicing more & more of itself -->
			{@const nameDateQuant2 = nameDateQuant.toSpliced(0, 1)}
			<tr>
				<th class="sticky left-0 z-10 bg-[#246c64] text-end text-2xl text-white"
					>#{nameDateQuant2[0].master}</th>
				{#if !isNameHidden}
					<td>{nameDateQuant2[0].name}</td>
				{/if}
				{#if isReverse}
					{#each nameDateQuant2.toReversed() as { quantity }, i (i)}
						<td class="text-center">{quantity}</td>
					{/each}{:else}
					{#each nameDateQuant2 as { quantity }, i (i)}
						<td class="text-center">{quantity}</td>
					{/each}
				{/if}
			</tr>
		{/each}
	</tbody>
</table>
