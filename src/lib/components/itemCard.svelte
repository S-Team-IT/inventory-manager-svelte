<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ImageModal from '$lib/components/imageModal.svelte';
	import { deleteItem } from '$lib/remote/item.remote';
	import type { DetailedItem } from '$lib/types/databaseTypes';
	import { truncateString } from '$lib/utils/stringTransform';
	import { toast } from 'svelte-sonner';

	let {
		id,
		master,
		name,
		category,
		supplier,
		quantity,
		thumbnail,
		gallery,
		deletedItems = undefined
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

<div class="card max-w-50 bg-accent shadow-sm">
	<ImageModal id={master} thumbnailSrc={thumbnail} gallerySrc={gallery} />
	<div class="card-body p-4 text-gray-800">
		<h2 class="card-title flex-col items-start gap-0 text-2xl">
			<span> {master}|{truncateString(name, 15)}</span>
			<span class="text-lg">{category}</span>
			<span class="text-sm">{supplier}</span>
		</h2>
		<p>
			{quantity | 0} in Inventory
		</p>
		<div class="card-actions justify-end">
			<button
				class="btn size-12.5 btn-soft btn-error"
				aria-label="delete"
				onclick={openDeleteConfirmation}
			>
				<span class="icon-[tabler--trash]"></span>
			</button>
			<button
				class="btn h-12.5 w-12.5 btn-soft btn-primary"
				aria-label="edit"
				onclick={() => goto(resolve('/item/[slug]', { slug: id }))}
				><span class="icon-[boxicons--edit]"></span></button
			>
		</div>
	</div>
</div>

<dialog id={`confirm-modal${master}`} class="modal">
	<div class="modal-box">
		<h2 class="text-lg">Are you sure you want to delete {name}?</h2>
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
