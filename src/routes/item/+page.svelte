<script lang="ts">
	const { data } = $props();
</script>

<h1>hello</h1>

<table class="table max-w-200">
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
		{#each data.items as { id, name, category, thumbnail, photos } (id)}
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
		{/each}
	</tbody>
</table>
