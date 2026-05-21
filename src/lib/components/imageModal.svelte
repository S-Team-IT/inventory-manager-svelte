<script lang="ts">
	type Props = {
		id: string;
		thumbnailSrc: string;
		gallerySrc: [] | { item: string }[];
	};

	const { id, thumbnailSrc, gallerySrc }: Props = $props();
</script>

<button
	onclick={(e) => {
		e.stopPropagation();
		const dialog = document.querySelector(`#img-modal${id}`);
		(dialog as HTMLDialogElement).showModal();
	}}><img src={thumbnailSrc} alt="thumbnail" loading="lazy" class="w-full" /></button
>
<dialog id={`img-modal${id}`} class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn absolute top-2 right-2 btn-circle btn-ghost btn-sm">✕</button>
		</form>
		<!-- <h3 class="text-lg font-bold">{name} gallery</h3> -->
		<div class="grid grid-cols-3 gap-2">
			<img src={thumbnailSrc} alt="thumbnail" loading="lazy" />
			{#each gallerySrc as { item }, i (i)}
				<img src={item} alt={`photo #${i}`} loading="lazy" />
			{/each}
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
