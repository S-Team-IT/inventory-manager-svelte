<script lang="ts">
	const { data } = $props();
</script>

<h1>hello</h1>

<!-- <table class="table max-w-200">
	<thead>
		<tr>
			<th class="w-25"></th>
			<th class="w-50">Photos</th>
			<th>Name</th>
			<th>Category</th>
			<th>Quantity</th>
		</tr>
	</thead>
	<tbody>
		{#each data.items as { id, masterNumber, name, category, quantity, thumbnailUrl, photoUrls } (id)}
			<tr class="hover:bg-base-300">
				<th class="w-25 text-2xl">{masterNumber}</th>
				<th class="flex w-50 items-center justify-center"><img src={thumbnailUrl} alt="" /></th>
				<th>{name}</th>
				<th>{category}</th>
				<th class="text-center">{quantity}</th>
			</tr>
		{/each}
	</tbody>
</table> -->
