<script lang="ts">
	import Combobox from '$lib/components/combobox.svelte';
	import Form from '$lib/components/form.svelte';
	import Input from '$lib/components/input.svelte';
	import InputFile from '$lib/components/inputFile.svelte';
	import InputIssues from '$lib/components/inputIssues.svelte';
	import { createItem } from '$lib/remote/item.remote';
	import type { EnhanceParams } from '$lib/types/types';
	import ItemCard from './itemCard.svelte';
	import PhotoPreview from './photoPreview.svelte';

	const { masterNumber, name, category, supplier, quantity, thumbnail, photos, isDisabled } =
		createItem.fields;

	const { data } = $props();

	let isFilling = $state<boolean>(true);
	const oninput = () => (isFilling = true);

	async function enhanceCallback({ data, submit }: EnhanceParams) {
		console.log(data);
		await submit!();
	}
</script>

<div class="flex">
	<Form
		remoteForm={createItem}
		legend="Add new item"
		errorMsg="Failed to add item"
		successMsg="Added new item"
		{isFilling}
		classes="grow"
		{enhanceCallback}
	>
		<Input
			label="Master Number"
			type="text"
			field={masterNumber}
			{oninput}
			placeholder="Enter master number"
		/>
		<Input label="Name" type="text" field={name} {oninput} placeholder="Enter item name" />
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
		<Input label="Quantity" type="number" field={quantity} {oninput} placeholder="0" value="0" />
		<InputFile label="Pick a thumbnail" type="file" field={thumbnail} subtitle="Main photo" />
		<InputFile
			label="Pick additional photos"
			type="file multiple"
			field={photos}
			subtitle="Gallery photos"
		/>
		<div class="mb-2">
			<label class="label">
				<input {...isDisabled.as('checkbox')} class="checkbox checkbox-lg checkbox-secondary" />
				Disabled
			</label>
			<InputIssues field={isDisabled} />
		</div>
		<button type="submit" class="btn btn-primary">Add</button>
	</Form>

	<div class="flex flex-col">
		<PhotoPreview thumbnailFile={thumbnail.value()} galleryFiles={photos.value()} />
	</div>
	<div class="grow">
		{#if createItem.result?.success}
			<ItemCard {...createItem.result.item} />
		{/if}
	</div>
</div>
