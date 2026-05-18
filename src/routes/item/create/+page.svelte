<script lang="ts">
	import Form from '$lib/components/form.svelte';
	import Input from '$lib/components/input.svelte';

	import { createItem } from '$lib/remote/item.remote';

	// const { data } = $props();

	const { masterNumber, name, category, supplier, quantity } = createItem.fields;

	let isFilling = $state<boolean>(true);
	const oninput = () => (isFilling = true);
</script>

<Form
	remoteForm={createItem}
	legend="Add new item"
	errorMsg="Failed to add item"
	successMsg="Added new item"
	{isFilling}
	classes="w-125"
>
	<Input
		label="Master Number"
		type="text"
		field={masterNumber}
		{oninput}
		placeholder="Enter master number"
	/>
	<Input label="Name" type="text" field={name} {oninput} placeholder="Enter item name" />
	<Input
		label="Category"
		type="text"
		field={category}
		{oninput}
		placeholder="Select Category or create a new one"
	/>
	<Input
		label="Supplier"
		type="text"
		field={supplier}
		{oninput}
		placeholder="Select Supplier or create a new one"
	/>
	<Input label="Quantity" type="text" field={quantity} {oninput} placeholder="0" value="0" />
	<fieldset class="fieldset gap-0">
		<legend class="fieldset-legend">Pick a thumbnail</legend>
		<input type="file" class="file-input" />
		<span class="label">Main photo</span>
	</fieldset>
	<fieldset class="fieldset gap-0">
		<legend class="fieldset-legend">Pick additional photos</legend>
		<input type="file" class="file-input" multiple />
		<span class="label">Gallery photos</span>
	</fieldset>
</Form>
