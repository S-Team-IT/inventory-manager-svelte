<script lang="ts">
	import Combobox from '$lib/components/base/combobox.svelte';
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import InputFile from '$lib/components/base/inputFile.svelte';
	import InputIssues from '$lib/components/base/inputIssues.svelte';
	import ItemCard from '$lib/components/itemCard.svelte';
	import { createItem } from '$lib/remote/item.remote.js';
	import type { DetailedItem } from '$lib/types/databaseTypes.js';
	import PhotoPreview from './photoPreview.svelte';
	import { getCompressedUrl } from '$lib/utils/imageUploader.js';
	import { tick } from 'svelte';

	const {
		master,
		name,
		category,
		supplier,
		quantity,
		thumbnail,
		gallery,
		isDisabled,
		thumbnailUrl
	} = createItem.fields;

	const { data } = $props();
	let addedItems = $state<DetailedItem[]>([]);
	let deletedItems = $state<string[]>([]);
	let filteredItems = $derived.by(() => {
		return addedItems.filter(({ master }) => !deletedItems.includes(master));
	});

	async function handleFormSubmit(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) {
		e.preventDefault();
		const form = e.currentTarget.form;
		if (!form) return;

		const thumbnailFile = thumbnail.value();
		if (!thumbnailFile) return;
		thumbnailUrl.set(await getCompressedUrl(thumbnailFile, `thumbnail_${Date.now()}`));

		await tick();

		form.requestSubmit();
	}
</script>

<div class="flex">
	<Form
		remoteForm={createItem}
		legend="Add new item"
		errorMsg="Failed to add item"
		successMsg="Added new item"
		classes="grow"
		onSuccess={() => {
			if (createItem.result?.item) addedItems.push(createItem.result.item);
		}}
	>
		<input {...thumbnailUrl.as('text')} class="hidden" />
		<Input label="Master" type="text" field={master} placeholder="Enter master number" />
		<Input label="Name" type="text" field={name} placeholder="Enter item name" />
		<Combobox
			label="Category"
			field={category}
			list={data.categories}
			subtitle="New categories can be added as needed"
			placeholder="Enter category"
		/>
		<Combobox
			label="Supplier"
			field={supplier}
			list={data.suppliers}
			subtitle="New suppliers can be added as needed"
			placeholder="Enter supplier"
		/>
		<Input label="Quantity" type="number" field={quantity} placeholder="0" value="0" />
		<InputFile label="Pick a thumbnail" type="file" field={thumbnail} subtitle="Main photo" />
		<InputFile
			label="Pick additional photos"
			type="file multiple"
			field={gallery}
			subtitle="Gallery photos"
		/>
		<div class="mb-2">
			<label class="label">
				<input {...isDisabled.as('checkbox')} class="checkbox checkbox-lg checkbox-secondary" />
				Disabled
			</label>
			<InputIssues field={isDisabled} />
		</div>
		<button type="submit" class="btn btn-primary" onclick={(e) => handleFormSubmit(e)}>Add</button>
	</Form>

	<div class="flex flex-col">
		<PhotoPreview thumbnailFile={thumbnail.value()} galleryFiles={gallery.value()} />
	</div>
	<div>
		{#each filteredItems as item (item.id)}
			<ItemCard {...item} {deletedItems} />
		{/each}
	</div>
</div>
