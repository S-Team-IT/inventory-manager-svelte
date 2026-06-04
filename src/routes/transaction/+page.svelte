<script lang="ts">
	const { data } = $props();
</script>

{#each data.transactions as transaction, i (i)}
	<tr>
		{#each Object.entries(transaction) as [key, value] (key)}
			<th>{value}</th>
		{/each}
	</tr>
{/each}
