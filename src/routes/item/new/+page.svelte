<script lang="ts">
	import Combobox from '$lib/components/base/combobox.svelte';
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import InputFile from '$lib/components/base/inputFile.svelte';
	import InputIssues from '$lib/components/base/inputIssues.svelte';
	import ItemAccordion from '$lib/components/itemAccordion.svelte';
	import { createItem } from '$lib/remote/item.remote.js';
	import type { DetailedItem } from '$lib/types/databaseTypes.js';

	const {
		master,
		name,
		category,
		// supplier,
		quantity,
		thumbnail,
		gallery,
		isDisabled,
		minimumQuantity
	} = createItem.fields;

	const { data } = $props();
	let addedItems = $state<DetailedItem[]>([]);
	// Items that are deleted are added to deletedItems,
	// which filters them out of being displayed.
	// There is most definitely a simpler way of doing this.
	let deletedItems = $state<string[]>([]);
	let filteredItems = $derived.by(() => {
		return addedItems.filter(({ master }) => !deletedItems.includes(master)).reverse();
	});
</script>

<svelte:head>
	<title>Add item</title>
</svelte:head>

<div class="flex">
	<Form
		remoteForm={createItem}
		legend="Add new item"
		errorMsg="Failed to add item"
		successMsg="Added new item"
		classes="grow"
		onSuccess={() => {
			if (createItem.result?.item) addedItems.push(createItem.result.item);
		}}>
		<Input label="Master" type="text" field={master} placeholder="Enter master number" />
		<Input label="Name" type="text" field={name} placeholder="Enter item name" />
		<Combobox
			label="Category"
			field={category}
			list={data.categories}
			subtitle="New categories can be added as needed"
			placeholder="Enter category" />
		<!-- <Combobox
			label="Supplier"
			field={supplier}
			list={data.suppliers}
			subtitle="New suppliers can be added as needed"
			placeholder="Enter supplier"
		/> -->
		<Input label="Quantity" type="number" field={quantity} value="0" placeholder="Enter quantity" />
		<Input
			label="Minimum Quantity"
			type="number"
			field={minimumQuantity}
			value="0"
			placeholder="Enter minimum quantity" />
		<InputFile label="Pick a thumbnail" type="file" field={thumbnail} subtitle="Main photo" />
		<InputFile
			label="Pick additional photos"
			type="file multiple"
			field={gallery}
			subtitle="Gallery photos" />
		<div class="mb-2">
			<label class="label">
				<input {...isDisabled.as('checkbox')} class="checkbox checkbox-lg checkbox-secondary" />
				Disabled
			</label>
			<InputIssues field={isDisabled} />
		</div>
		<button type="submit" class="btn btn-primary">Add</button>
	</Form>
	<div>
		{#each filteredItems as item (item.id)}
			<ItemAccordion {...item} {deletedItems} />
		{/each}
	</div>
</div>
