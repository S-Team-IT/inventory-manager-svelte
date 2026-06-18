<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ImageModal from '$lib/components/imageModal.svelte';
	import { deleteItem } from '$lib/remote/item.remote';
	import type { DetailedItem } from '$lib/types/databaseTypes';
	import { toast } from 'svelte-sonner';

	let {
		id,
		master,
		name,
		category,
		// supplier,
		quantity,
		thumbnail,
		gallery,
		deletedItems = undefined,
		minimumQuantity
	}: DetailedItem & { deletedItems?: string[] | undefined } = $props();

	function openDeleteConfirmation() {
		const modal = document.querySelector(`#confirm-modal${master}`);
		(modal as HTMLDialogElement).showModal();
	}

	function closeDeleteConfirmation() {
		const modal = document.querySelector(`#confirm-modal${master}`);
		(modal as HTMLDialogElement).close();
	}
</script>

<details class="collapse border border-base-300 bg-base-100" name="my-accordion-det-1" open>
	<summary class="collapse-title font-semibold">
		<div class="flex items-center justify-between gap-10">
			#{master} | {name}
			<button
				class="btn size-12.5 btn-soft btn-error"
				aria-label="delete"
				onclick={openDeleteConfirmation}
			>
				<span class="icon-[tabler--trash]"></span>
			</button>
		</div>
	</summary>
	<div class="collapse-content text-sm">
		<ImageModal id={master} thumbnailSrc={thumbnail} gallerySrc={gallery} /> <br />
		{category} <br />
		{quantity | 0} in inventory <br />
		{minimumQuantity | 0} minimum
	</div>
</details>

<dialog id={`confirm-modal${master}`} class="modal">
	<div class="modal-box">
		<h2 class="text-lg">
			Are you sure you want to delete {name}?
		</h2>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-soft btn-secondary">Cancel</button>
			</form>
			<form
				{...deleteItem.for(id).enhance(async ({ form, submit }) => {
					if (await submit()) {
						form.reset();
						toast.success('Item deleted');
						if (deletedItems) deletedItems.push(master);
						closeDeleteConfirmation();
						goto(resolve('/item'));
					} else {
						toast.error('Failed to delete item');
					}
				})}
			>
				<input {...deleteItem.fields.master.as('hidden', master)} />
				<button class="btn btn-primary">Confirm</button>
			</form>
		</div>
	</div>
</dialog>
