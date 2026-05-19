<script lang="ts">
	import Form from '$lib/components/form.svelte';
	import Input from '$lib/components/input.svelte';
	import InputIssues from '$lib/components/inputIssues.svelte';
	import InputFile from '$lib/components/inputFile.svelte';

	import { createItem } from '$lib/remote/item.remote';

	const { masterNumber, name, category, supplier, quantity, thumbnail, photos, isDisabled } =
		createItem.fields;

	let isFilling = $state<boolean>(true);
	const oninput = () => (isFilling = true);
</script>

<div class="flex">
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
		<Input label="Quantity" type="number" field={quantity} {oninput} placeholder="0" value="0" />
		<InputFile label="Pick a thumbnail" type="file" field={thumbnail} subtitle="Main photo" />
		<InputFile
			label="Pick additional photos"
			type="file multiple"
			field={photos}
			subtitle="Gallery photos"
		/>
		<label class="label">
			<input {...isDisabled.as('checkbox')} class="checkbox checkbox-lg checkbox-secondary" />
			Disabled
		</label>
		<InputIssues field={isDisabled} />
		<button type="submit" class="btn btn-primary">Add</button>
	</Form>
</div>
