<script lang="ts">
	import Form from '$lib/components/form.svelte';
	import Input from '$lib/components/input.svelte';
	import InputIssues from '$lib/components/inputIssues.svelte';
	import InputFile from '$lib/components/inputFile.svelte';
	import Combobox from '$lib/components/combobox.svelte';

	import { createItem } from '$lib/remote/item.remote';
	const { masterNumber, name, category, supplier, quantity, thumbnail, photos, isDisabled } =
		createItem.fields;

	const { data } = $props();

	let isFilling = $state<boolean>(true);
	const oninput = () => (isFilling = true);

	let thumbnailUrl = $derived.by((): string => {
		let file = thumbnail.value();
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			return imageUrl;
		}
		return '';
	});
	let photoUrls = $derived.by((): string[] => {
		let files = photos.value();
		if (!files) return [];
		const urlList: string[] = [];
		files.forEach((file) => {
			if (!file) return;
			const imageUrl = URL.createObjectURL(file);
			urlList.push(imageUrl);
		});
		return urlList;
	});
</script>

<div class="flex">
	<Form
		remoteForm={createItem}
		legend="Add new item"
		errorMsg="Failed to add item"
		successMsg="Added new item"
		{isFilling}
		classes="grow"
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
		{#if thumbnailUrl}
			<h2>Thumbnail</h2>
			<img
				class="max-w-50"
				src={thumbnailUrl}
				alt="thumbnail preview"
				onload={() => URL.revokeObjectURL(thumbnailUrl)}
			/>
		{/if}
		{#if photoUrls.length !== 0}
			<h2>Gallery</h2>
			<div class="grid grid-cols-2 gap-2">
				{#each photoUrls as url, i (i)}
					<img
						class="max-w-50"
						src={url}
						alt="Gallery img #{i}"
						onload={() => URL.revokeObjectURL(url)}
					/>
				{/each}
			</div>
		{/if}
	</div>
	<div class="grow"></div>
</div>

{#snippet itemCard({
	masterNumber,
	name,
	category,
	categoryID,
	supplier,
	supplierID,
	quantity
}: Item)}
	<h1>{masterNumber}| {name}</h1>
	<div>
		Category: {categoryID} | {category} <br />
		Supplier: {supplierID} | {supplier}<br />
		Quantity: {quantity}
	</div>
{/snippet}
