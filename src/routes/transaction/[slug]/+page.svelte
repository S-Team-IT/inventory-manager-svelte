<script lang="ts">
	import Combobox from '$lib/components/base/combobox.svelte';
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import {
		addTransactionItem,
		deleteTransactionItem,
		editDeliveryRef,
		editInvoiceRef,
		editPurchaseRef,
		editQuantity,
		editRemarks,
		editSupplier,
		editUser
	} from '$lib/remote/transaction.remote.js';
	import type { Generic } from '$lib/types/databaseTypes.js';
	import { localeCompareSort } from '$lib/utils/arraySort.js';
	import { formatYearMonthDay } from '$lib/utils/dateFns.js';
	import { truncateString } from '$lib/utils/stringTransform';
	import { toast } from 'svelte-sonner';

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
		items,
		supplier
	} = $derived(data.transaction);

	let sortedItems = $derived.by(() =>
		items.toSorted((a, b) => localeCompareSort(a.master, b.master))
	);
</script>

<svelte:head>
	<title>Edit transaction</title>
</svelte:head>

<h1 class="ms-5 mt-2 text-2xl font-bold">Edit Transaction</h1>
<div class="ms-5 mt-2 flex">
	{#if data.isIncoming}
		<div class=" max-w-75">
			{@render editForm({
				remoteForm: editPurchaseRef,
				errorMsg: 'Failed to update PO number.',
				successMsg: 'Successfully updated PO number.',
				label: 'PO',
				field: editPurchaseRef.fields.purchaseRef,
				placeholder: purchaseRef
			})}
			{@render editComboboxForm({
				remoteForm: editSupplier,
				errorMsg: 'Failed to update supplier.',
				successMsg: 'Successfully updated supplier.',
				label: 'Supplier',
				field: editSupplier.fields.supplier,
				placeholder: supplier,
				list: data.suppliers
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
			<div>Supplier: {supplier}</div>
			<div>Delivery: {deliveryRef}</div>
			<div>Invoice: {invoiceRef}</div>
		</div>
	{:else}
		<div class="max-w-75">
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
	{/if}
</div>

<div class="ms-5 mt-2 flex">
	<Form
		remoteForm={addTransactionItem}
		errorMsg="Failed to add item"
		successMsg="Added item to transaction"
		legend="Add item to transaction">
		<input
			{...addTransactionItem.fields.isIncoming.as('checkbox', data.isIncoming)}
			class="invisible" />
		<input {...addTransactionItem.fields.transactionID.as('hidden', id)} />
		<Input field={addTransactionItem.fields.master} type="text" label="Master"></Input>
		<Input field={addTransactionItem.fields.quantity} type="number" label="Quantity"></Input>
		<button class="btn btn-secondary">Add</button>
	</Form>
</div>

<div class="flex justify-center">
	<table class="table mt-2">
		<thead>
			<tr>
				<th></th>
				<th scope="col">Master</th>
				<th scope="col">Name</th>
				<th scope="col">Quantity</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedItems as { id: itemID, master: itemMaster, name: itemName, quantity: itemQuantity }, i (i)}
				{@const quantityForm = editQuantity.for(`item_quantity_${i}`)}
				{@const deleteForm = deleteTransactionItem.for(`transaction_item_${i}`)}
				<tr>
					<th>
						<form
							{...deleteForm.enhance(async ({ form, submit }) => {
								if (await submit()) {
									const { success } = form.result;
									if (success) {
										toast.success('Deleted item');
										form.reset();
									} else {
										toast.error('Failed to delete item');
									}
								}
							})}>
							<input {...deleteForm.fields.transactionID.as('hidden', id)} />
							<input {...deleteForm.fields.itemID.as('hidden', itemID)} />
							<button aria-label="delete" type="submit">
								<span class="icon-[tabler--trash]"></span>
							</button>
						</form>
					</th>
					<th class="w-15">{itemMaster}</th>
					<th>{truncateString(itemName, 50)}</th>
					<th>
						<form
							{...quantityForm.enhance(async ({ form, submit }) => {
								if (await submit()) {
									const { success } = form.result;
									if (success) toast.success('Successfully updated quantity');
									else toast.error('Failed to update quantity');
								}
							})}>
							<input {...quantityForm.fields.transactionID.as('hidden', id)} />
							<input {...quantityForm.fields.itemID.as('hidden', itemID)} />
							<input
								{...quantityForm.fields.isIncoming.as('checkbox', data.isIncoming)}
								class="invisible" />
							<Input
								field={quantityForm.fields.quantity}
								type="number"
								placeholder={String(itemQuantity)}
								label=""
								rightButton="Edit" />
						</form>
					</th>
				</tr>
			{/each}
		</tbody>
	</table>
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
