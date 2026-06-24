<script lang="ts">
	const { data } = $props();
	const dates = $derived.by(() => {
		const itemIDs = Object.keys(data.timeline);
		const firstID = itemIDs[0];
		return data.timeline[firstID].map((week) => week);
	});

	function onclick() {
		let csvData: string[] = [];

		let rows = document.getElementsByTagName('tr');
		for (let i = 0; i < rows.length; i++) {
			let cols = rows[i].querySelectorAll('td,th');

			let csvrow = [];
			for (let j = 0; j < cols.length; j++) {
				csvrow.push(cols[j].innerHTML);
			}

			csvData.push(csvrow.join(','));
		}
		console.log(csvData.join('\n'));
		console.log(csvData);
	}
</script>

<button {onclick}>Copy</button>
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
