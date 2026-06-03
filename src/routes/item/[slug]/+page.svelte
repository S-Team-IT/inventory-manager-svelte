<script lang="ts">
	import { resolve } from '$app/paths';
	import Combobox from '$lib/components/base/combobox.svelte';
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import InputFile from '$lib/components/base/inputFile.svelte';
	import LoadingModal from '$lib/components/base/loadingModal.svelte';
	import ItemCard from '$lib/components/itemCard.svelte';
	import {
		editCategory,
		editGallery,
		editMaster,
		editName,
		editSupplier,
		editThumbnail
	} from '$lib/remote/item.remote';
	import type { DetailedItem, Generic } from '$lib/types/databaseTypes.js';
	import { getCompressedUrl, getOneCompressedUrl } from '$lib/utils/imageUploader';
	import { tick } from 'svelte';
	import PhotoPreview from '../new/photoPreview.svelte';

	const { id: thumbnailID, thumbnail, thumbnailUrl } = editThumbnail.fields;
	const { id: galleryID, gallery, galleryUrls } = editGallery.fields;

	const { data } = $props();
	let { id, master, name, category, supplier }: DetailedItem = $derived(data.item);

	let checked = $state<boolean>(false);

	async function handleThumbnailSubmit(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) {
		e.preventDefault();
		checked = true;
		const form = e.currentTarget.form;
		if (!form) return;

		thumbnailUrl.set(await getOneCompressedUrl(thumbnail.value()));

		await tick();

		form.requestSubmit();
	}

	let galleryUrlArray = $state<string[]>([]);

	async function handleGallerySubmit(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) {
		e.preventDefault();
		checked = true;
		const form = e.currentTarget.form;
		if (!form) return;

		const galleryFiles = gallery.value();
		if (galleryFiles) {
			for (const [i, file] of galleryFiles.entries()) {
				if (file) galleryUrlArray.push(await getCompressedUrl(file, `gallery_${Date.now()}_${i}`));
			}
			galleryUrls.set(galleryUrlArray);
		}
		console.log(galleryUrls.value());
		await tick();

		form.requestSubmit();
	}
</script>

<div class="breadcrumbs text-sm">
	<ul>
		<li><a href={resolve('/')} class="underline">Home</a></li>
		<li><a href={resolve('/item')} class="underline">Item List</a></li>
		<li>Add Item</li>
	</ul>
</div>

{#if !data.item}
	404 not found
{:else}
	<div class="flex">
		<div class="max-w-75">
			{@render editForm(
				editMaster,
				editMaster.fields.master,
				master,
				'Master',
				'Failed to update master number.',
				'Successfully updated master number.'
			)}
			{@render editForm(
				editName,
				editName.fields.name,
				name,
				'Name',
				'Failed to update name.',
				'Successfully updated name.'
			)}
			{@render editComboboxForm(
				editCategory,
				editCategory.fields.category,
				data.categories,
				'Category',
				'Failed to update category.',
				'Successfully updated category.',
				category
			)}
			{@render editComboboxForm(
				editSupplier,
				editSupplier.fields.supplier,
				data.suppliers,
				'Supplier',
				'Failed to update supplier.',
				'Successfully updated supplier.',
				supplier
			)}
		</div>
		<div>
			<Form
				remoteForm={editThumbnail}
				errorMsg="Failed to update thumbnail."
				successMsg="Thumbnail has been updated."
				afterSubmit={() => (checked = false)}
			>
				<input {...thumbnailID.as('hidden', id)} />
				<input {...thumbnailUrl.as('text')} class="hidden" />
				<InputFile label="Thumbnail" type="file" field={thumbnail} subtitle="Main photo" />
				<button class="btn btn-primary" onclick={(e) => handleThumbnailSubmit(e)}>Update</button>
			</Form>
			<Form
				remoteForm={editGallery}
				errorMsg="Failed to update gallery."
				successMsg="Gallery has been updated."
				afterSubmit={() => (checked = false)}
			>
				<input {...galleryID.as('hidden', id)} />
				{#each galleryUrlArray as url, i (i)}
					<input {...galleryUrls[i].as('text', url)} class="hidden" />
				{/each}
				<InputFile
					label="Additional Photos"
					type="file multiple"
					field={gallery}
					subtitle="Gallery photos"
				/>
				<button class="btn btn-primary" onclick={(e) => handleGallerySubmit(e)}>Update</button>
			</Form>
		</div>
		<div><PhotoPreview thumbnailFile={thumbnail.value()} galleryFiles={gallery.value()} /></div>
		<div>
			<ItemCard {...data.item} />
		</div>
	</div>
	<LoadingModal {checked} />
{/if}

{#snippet editForm(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	remoteForm: any,
	field: unknown,
	value: string,
	label: string,
	errorMsg: string,
	successMsg: string
)}
	<Form {remoteForm} {errorMsg} {successMsg}>
		<input {...remoteForm.fields.id.as('hidden', id)} />
		<Input {field} type="text" placeholder={value} {label} rightButton="Edit" />
	</Form>
{/snippet}

{#snippet editComboboxForm(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	remoteForm: any,
	field: unknown,
	list: Generic[],
	label: string,
	errorMsg: string,
	successMsg: string,
	placeholder: string
)}
	<Form {remoteForm} {errorMsg} {successMsg}>
		<input {...remoteForm.fields.id.as('hidden', id)} />
		<Combobox {label} {field} {list} rightButton="Edit" {placeholder} />
	</Form>
{/snippet}
