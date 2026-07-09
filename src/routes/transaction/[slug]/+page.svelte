<script lang="ts">
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import {
		editDeliveryRef,
		editInvoiceRef,
		editPurchaseRef
	} from '$lib/remote/transaction.remote.js';
	import type { Generic } from '$lib/types/databaseTypes.js';
	import { id } from 'zod/locales';

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

	const { data } = $props();

	$inspect(data.transaction);
	const { id, purchaseRef, deliveryDate, supplierID, deliveryRef, invoiceRef } = $derived(
		data.transaction
	);
</script>

<div class="flex">
	<div class="max-w-75">
		{@render editForm({
			remoteForm: editPurchaseRef,
			errorMsg: 'Failed to update PO number.',
			successMsg: 'Successfully updated PO number.',
			label: 'PO',
			field: editPurchaseRef.fields.purchaseRef,
			placeholder: purchaseRef
		})}
		{@render editForm({
			remoteForm: editDeliveryRef,
			errorMsg: 'Failed to update DO number.',
			successMsg: 'Successfully updated DO number.',
			label: 'DO',
			field: editDeliveryRef.fields.deliveryRef,
			placeholder: deliveryRef
		})}
		{@render editForm({
			remoteForm: editInvoiceRef,
			errorMsg: 'Failed to update invoice.',
			successMsg: 'Successfully updated invoice.',
			label: 'Invoice',
			field: editInvoiceRef.fields.invoiceRef,
			placeholder: invoiceRef
		})}
	</div>
</div>

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
