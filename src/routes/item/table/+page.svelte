<script lang="ts">
	import XLSX from 'xlsx';

	const { data } = $props();
	const dates = $derived.by(() => {
		const itemIDs = Object.keys(data.timeline);
		const firstID = itemIDs[0];
		return data.timeline[firstID].map((week) => week);
	});

	function onclick() {
		var tables = document.getElementsByTagName('table');
		var wb = XLSX.utils.book_new();
		for (var i = 0; i < tables.length; ++i) {
			var ws = XLSX.utils.table_to_sheet(tables[i], { raw: true });
			XLSX.utils.book_append_sheet(wb, ws, 'Table' + i);
		}

		XLSX.writeFile(wb, 'export.xlsx');
	}
</script>

<button {onclick} class="btn btn-primary">Export table</button>
<table class="table">
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
