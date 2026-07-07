<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import ImageModal from '$lib/components/imageModal.svelte';
	import { deleteItem } from '$lib/remote/item.remote';
	import type { DetailedItem } from '$lib/types/databaseTypes';
	import type { SvelteComponent } from 'svelte';
	import { toast } from 'svelte-sonner';
	import Accordion from './accordion.svelte';

	let {
		// id,
		master,
		name,
		category,
		quantity,
		thumbnail,
		gallery,
		deletedItems = undefined,
		minimumQuantity
	}: DetailedItem & { deletedItems?: string[] | undefined } = $props();

	let elementID = $derived(`confirm-modal${master}-${Date.now()}`);
	let uniqueForm = $derived(deleteItem.for(elementID));

	let accordionRef: SvelteComponent;
</script>

<Accordion
	bind:this={accordionRef}
	elementID={`confirm-modal${master}`}
	{summaryStart}
	{content}
	{deleteForm}
	deletePrompt={`Are you sure you want to delete ${name}?`}>
</Accordion>

{#snippet summaryStart()}
	#{master} | {name}
{/snippet}

{#snippet content()}
	<ImageModal id={master} thumbnailSrc={thumbnail} gallerySrc={gallery} /> <br />
	{category} <br />
	{quantity | 0} in inventory <br />
	{minimumQuantity | 0} minimum
{/snippet}

{#snippet deleteForm()}
	<form
		{...uniqueForm.enhance(async ({ form, submit }) => {
			if (await submit()) {
				form.reset();
				toast.success('Item deleted');
				if (deletedItems) deletedItems.push(master);
				accordionRef.closeDeleteConfirmation();
				goto(resolve('/item'));
			} else {
				toast.error('Failed to delete item');
			}
		})}>
		<input {...uniqueForm.fields.master.as('hidden', master)} />
		<button class="btn btn-primary">Confirm</button>
	</form>
{/snippet}
