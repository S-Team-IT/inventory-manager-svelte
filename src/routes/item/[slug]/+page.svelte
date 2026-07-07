<script lang="ts">
	import Combobox from '$lib/components/base/combobox.svelte';
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import InputFile from '$lib/components/base/inputFile.svelte';
	import ItemAccordion from '$lib/components/accordions/itemAccordion.svelte';
	import {
		editCategory,
		editGallery,
		editInitialQuantity,
		editMaster,
		editMinimumQuantity,
		editName,
		// editSupplier,
		editThumbnail
	} from '$lib/remote/item.remote';
	import type { DetailedItem, Generic } from '$lib/types/databaseTypes.js';

	const { data } = $props();
	let {
		id,
		master,
		name,
		category,
		// supplier,
		minimumQuantity,
		initialQuantity
	}: DetailedItem = $derived(data.item);

	type SnippetArgs = {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		remoteForm: any;
		errorMsg: string;
		successMsg: string;
		label: string;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		field: any;
		type?: string;
		placeholder?: string;
		subtitle?: string;
		list?: Generic[];
	};
</script>

<svelte:head>
	<title>Editing {master}</title>
</svelte:head>

{#if !data.item}
	404 not found
{:else}
	<div class="flex">
		{#if data.user?.role === 'Admin' || data.user?.role === 'QS'}
			<div class="max-w-75">
				{@render editForm({
					remoteForm: editMaster,
					errorMsg: 'Failed to update master number.',
					successMsg: 'Successfully updated master number.',
					label: 'Master',
					field: editMaster.fields.master,
					placeholder: master
				})}
				{@render editForm({
					remoteForm: editName,
					errorMsg: 'Failed to update name.',
					successMsg: 'Successfully updated name.',
					label: 'Name',
					field: editName.fields.name,
					placeholder: name
				})}
				{@render editComboboxForm({
					remoteForm: editCategory,
					errorMsg: 'Failed to update category.',
					successMsg: 'Successfully updated category.',
					label: 'Category',
					field: editCategory.fields.category,
					placeholder: category,
					list: data.categories
				})}
				<!-- {@render editComboboxForm({
					remoteForm: editSupplier,
					errorMsg: 'Failed to update supplier.',
					successMsg: 'Successfully updated supplier.',
					label: 'Supplier',
					field: editSupplier.fields.supplier,
					placeholder: supplier,
					list: data.suppliers
				})} -->
				{@render editForm({
					remoteForm: editMinimumQuantity,
					errorMsg: 'Failed to update minimum quantity.',
					successMsg: 'Successfully updated minimum quantity.',
					label: 'Minimum Quantity',
					field: editMinimumQuantity.fields.quantity,
					placeholder: minimumQuantity.toString(),
					type: 'number'
				})}
				{@render editForm({
					remoteForm: editInitialQuantity,
					errorMsg: 'Failed to update initial quantity.',
					successMsg: 'Successfully updated initial quantity.',
					label: 'Initial Quantity',
					field: editInitialQuantity.fields.quantity,
					placeholder: initialQuantity.toString(),
					type: 'number'
				})}
			</div>
			<div>
				{@render editInputFileForm({
					remoteForm: editThumbnail,
					errorMsg: 'Failed to update thumbnail.',
					successMsg: 'Thumbnail has been updated.',
					label: 'Thumbnail',
					field: editThumbnail.fields.thumbnail,
					type: 'file',
					subtitle: 'Main photo'
				})}
				{@render editInputFileForm({
					remoteForm: editGallery,
					errorMsg: 'Failed to update gallery.',
					successMsg: 'Gallery has been updated.',
					label: 'Gallery',
					field: editGallery.fields.gallery,
					type: 'file multiple',
					subtitle: 'Submitting with 0 files will clear the gallery photos.'
				})}
			</div>
		{/if}
		<div>
			<ItemAccordion {...data.item} />
		</div>
	</div>
{/if}

{#snippet editForm({
	remoteForm,
	errorMsg,
	successMsg,
	label,
	field,
	placeholder,
	type = 'text'
}: SnippetArgs)}
	<Form {remoteForm} {errorMsg} {successMsg}>
		<input {...remoteForm.fields.id.as('hidden', id)} />
		<Input {field} {type} {placeholder} {label} rightButton="Edit" />
	</Form>
{/snippet}

{#snippet editComboboxForm({
	remoteForm,
	errorMsg,
	successMsg,
	label,
	field,
	placeholder,
	list
}: SnippetArgs)}
	<Form {remoteForm} {errorMsg} {successMsg}>
		<input {...remoteForm.fields.id.as('hidden', id)} />
		<Combobox {label} {field} {list} rightButton="Edit" {placeholder} />
	</Form>
{/snippet}

{#snippet editInputFileForm({
	remoteForm,
	errorMsg,
	successMsg,
	label,
	field,
	type,
	subtitle
}: SnippetArgs)}
	<Form {remoteForm} {errorMsg} {successMsg}>
		<input {...remoteForm.fields.id.as('hidden', id)} />
		<InputFile {label} {type} {field} {subtitle} />
		<button class="btn btn-primary">Update</button>
	</Form>
{/snippet}
