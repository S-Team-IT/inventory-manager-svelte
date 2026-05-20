<script lang="ts">
	import ImageModal from '$lib/components/imageModal.svelte';
	import type { Item } from '$lib/types/databaseTypes';
	import EditItemModal from './editItemModal.svelte';

	const { masterNumber, name, category, supplier, quantity, thumbnail, photos }: Item = $props();

	function handleDelete() {
		confirm('Are you sure you want to delete this?');
	}

	function handleEdit() {
		const dialog = document.querySelector(`#edit-modal${masterNumber}`);
		(dialog as HTMLDialogElement).showModal();
	}
</script>

<div class="card bg-accent shadow-sm">
	<ImageModal id={masterNumber} thumbnailSrc={thumbnail} gallerySrc={photos} />
	<div class="card-body p-4 text-gray-800">
		<h2 class="card-title flex-col items-start gap-0 text-2xl">
			{name}
			<span class="text-lg">{category}</span>
			<span class="text-sm">{supplier}</span>
		</h2>
		<p>
			Quantity: {quantity}
		</p>
		<div class="card-actions justify-end">
			<button class="btn size-12.5 btn-soft btn-error" aria-label="delete" onclick={handleDelete}
				><span class="icon-[tabler--trash]"></span></button
			>
			<button class="btn h-12.5 w-12.5 btn-soft btn-primary" aria-label="edit" onclick={handleEdit}
				><span class="icon-[boxicons--edit]"></span></button
			>
		</div>
	</div>
</div>

<EditItemModal {masterNumber} />
