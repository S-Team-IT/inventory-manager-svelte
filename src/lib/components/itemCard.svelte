<script lang="ts">
	import ImageModal from '$lib/components/imageModal.svelte';
	import { deleteItem } from '$lib/remote/item.remote';
	import type { Item } from '$lib/types/databaseTypes';
	import { toast } from 'svelte-sonner';

	let {
		id,
		masterNumber,
		name,
		category,
		supplier,
		quantity,
		thumbnail,
		photos,
		deletedItems
	}: Item & { deletedItems: string[] } = $props();

	function openDeleteConfirmation() {
		const modal = document.querySelector(`#confirm-modal${masterNumber}`);
		(modal as HTMLDialogElement).showModal();
	}

	function handleEdit() {}
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
			{quantity} in Inventory
		</p>
		<div class="card-actions justify-end">
			<button
				class="btn size-12.5 btn-soft btn-error"
				aria-label="delete"
				onclick={openDeleteConfirmation}><span class="icon-[tabler--trash]"></span></button
			>
			<button class="btn h-12.5 w-12.5 btn-soft btn-primary" aria-label="edit" onclick={handleEdit}
				><span class="icon-[boxicons--edit]"></span></button
			>
		</div>
	</div>
</div>

<dialog id={`confirm-modal${masterNumber}`} class="modal">
	<div class="modal-box">
		<h2 class="text-lg">Are you sure you want to delete {name}?</h2>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-soft btn-secondary">Cancel</button>
			</form>
			<form
				{...deleteItem.for(id).enhance(async ({ submit }) => {
					if (await submit()) {
						toast.success('Item deleted');
						deletedItems.push(masterNumber);
						const modal = document.querySelector(`#confirm-modal${masterNumber}`);
						(modal as HTMLDialogElement).close();
					} else {
						toast.error('Failed to delete item');
					}
				})}
			>
				<input {...deleteItem.fields.masterNumber.as('hidden', masterNumber)} />
				<button class="btn btn-primary">Confirm</button>
			</form>
		</div>
	</div>
</dialog>
