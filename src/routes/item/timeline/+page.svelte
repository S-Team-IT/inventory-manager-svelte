<script lang="ts">
	import { tableToCSV } from '$lib/utils/tableToCSV.js';
	import { toast } from 'svelte-sonner';

	const { data } = $props();
	const dates = $derived.by(() => {
		const itemIDs = Object.keys(data.timeline);
		const firstID = itemIDs[0];
		return data.timeline[firstID].map((week) => week);
	});

	function onclick() {
		const table = document.querySelector('#timeline-table');
		if (!table) {
			toast.error('No table found');
			return;
		}
		tableToCSV(table, 'export');
	}
</script>

<button {onclick} class="btn btn-primary">Export table</button>
<table class="table" id="timeline-table">
	<thead>
		<tr>
			<th>Master</th>
			<th>Name</th>
			{#each dates as { week } (week)}
				<th scope="col">{week}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each Object.entries(data.timeline) as [id, nameDateQuant], i (i)}
			<tr>
				<th>{id}</th>
				<td>{nameDateQuant[0].name}</td>
				{#each nameDateQuant as { quantity }, i (i)}
					<td>{quantity}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
