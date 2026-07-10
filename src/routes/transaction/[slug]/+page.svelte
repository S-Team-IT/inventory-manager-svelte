<script lang="ts">
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import {
		editDeliveryRef,
		editInvoiceRef,
		editPurchaseRef,
		editQuantity,
		editRemarks,
		editUser
	} from '$lib/remote/transaction.remote.js';
	import type { Generic } from '$lib/types/databaseTypes.js';
	import { formatYearMonthDay } from '$lib/utils/dateFns.js';
	import { truncateString } from '$lib/utils/stringTransform';
	import {} from 'os';

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
	const {
		id,
		purchaseRef,
		deliveryDate,
		deliveryRef,
		invoiceRef,
		expendDate,
		expender,
		remarks,
		items
	} = $derived(data.transaction);

	$inspect(data.transaction);
</script>

<svelte:head>
	<title>Edit transaction</title>
</svelte:head>

{#if data.isIncoming}
	<div class="mt-2 flex">
		<div class="ms-5 max-w-75">
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
		<div class="ms-5 mt-1">
			<div>Purchase: {purchaseRef}</div>
			<div>Date: {formatYearMonthDay(deliveryDate!)}</div>
			<!-- <div>Supplier: {supplierID}</div> -->
			<div>Delivery: {deliveryRef}</div>
			<div>Invoice: {invoiceRef}</div>
		</div>
	</div>
{:else}
	<div class="mt-2 flex">
		<div class="ms-5 max-w-75">
			{@render editForm({
				remoteForm: editUser,
				errorMsg: 'Failed to update user.',
				successMsg: 'Successfully updated user.',
				label: 'User',
				field: editUser.fields.user,
				placeholder: expender
			})}
			{@render editForm({
				remoteForm: editRemarks,
				errorMsg: 'Failed to update remarks.',
				successMsg: 'Successfully updated remarks.',
				label: 'Remarks',
				field: editRemarks.fields.remarks,
				placeholder: remarks
			})}
		</div>
		<div class="ms-5 mt-1">
			<div>Date: {formatYearMonthDay(expendDate!)}</div>
			<div>User: {expender}</div>
			<div>Remarks: {remarks}</div>
		</div>
	</div>
{/if}

<table class="table">
	<thead>
		<tr>
			<th></th>
			<th scope="col">Master</th>
			<th scope="col">Name</th>
			<th scope="col">QTY</th>
		</tr>
	</thead>
	<tbody>
		{#each items as { id: itemID, master: itemMaster, name: itemName, quantity: itemQuantity }, i (i)}
			{@const uniqueForm = editQuantity.for(`item_quantity_${i}`)}
			<tr>
				<th>
					<!-- <button aria-label="delete" type="button">
							<span class="icon-[tabler--trash]"></span>
						</button> -->
				</th>
				<th class="w-15">{itemMaster}</th>
				<th>{truncateString(itemName, 50)}</th>
				<th>
					<Form
						remoteForm={uniqueForm}
						errorMsg="Failed to update quantity"
						successMsg="Successfully updated quantity">
						<input {...uniqueForm.fields.transactionID.as('hidden', id)} />
						<input {...uniqueForm.fields.itemID.as('hidden', itemID)} />
						<input
							{...uniqueForm.fields.isIncoming.as('checkbox', data.isIncoming)}
							class="invisible" />
						<Input
							field={uniqueForm.fields.quantity}
							type="number"
							placeholder={String(itemQuantity)}
							label=""
							rightButton="Edit" />
					</Form>
				</th>
			</tr>
		{/each}
	</tbody>
</table>

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
