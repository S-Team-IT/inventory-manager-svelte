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
	const datesReversed = $derived(dates?.toReversed());
	const datesToDisplay = $derived(isReverse ? datesReversed : dates);

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

<svelte:head>
	<title>Weekly Balance</title>
</svelte:head>

<div class="table-filter-group">
	<button onclick={toggleReverse} class="btn btn-primary">
		Date
		<span class={isReverse ? 'icon-[mdi--arrow-left]' : 'icon-[mdi--arrow-right]'}></span>
	</button>
	<button onclick={toggleNameColumn} class="btn btn-primary">
		Name
		<span class={isNameHidden ? 'icon-[mdi--hide]' : 'icon-[mdi--show]'}></span>
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

			{#each datesToDisplay as { week } (week)}
				<th scope="col" class="sticky top-0 z-20 bg-[#2a9d8f] text-white">{week}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each sortedTimeline as [, nameDateQuant], i (i)}
			<!-- Database returns 1 extra week at the start, so gotta remove it -->
			<!-- Can't just mutate the original because then it keeps splicing more & more of itself -->
			{@const nameDateQuantSpliced = nameDateQuant.toSpliced(0, 1)}
			<tr>
				<th class="sticky left-0 z-10 bg-[#246c64] text-end text-2xl text-white"
					>#{nameDateQuantSpliced[0].master}</th>
				{#if !isNameHidden}
					<td>{nameDateQuantSpliced[0].name}</td>
				{/if}
				{#if isReverse}
					{#each nameDateQuantSpliced.toReversed() as { quantity }, i (i)}
						<td class="text-center">{quantity}</td>
					{/each}{:else}
					{#each nameDateQuantSpliced as { quantity }, i (i)}
						<td class="text-center">{quantity}</td>
					{/each}
				{/if}
			</tr>
		{/each}
	</tbody>
</table>
