<script lang="ts">
	import Combobox from '$lib/components/base/combobox.svelte';
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import InputIssues from '$lib/components/base/inputIssues.svelte';
	import TransactionAccordion from '$lib/components/transactionAccordion.svelte';
	import TransactionItemForm from '$lib/components/transactionItemForm.svelte';
	import TransactionItemTable from '$lib/components/transactionItemTable.svelte';
	import { createIncomingTransaction } from '$lib/remote/transaction.remote.js';
	import type { Item } from '$lib/types/databaseTypes.js';

	const { date, supplier, deliveryID, ids } = createIncomingTransaction.fields;

	const { data } = $props();
	let items = $state<Item[]>([]);
</script>

<div class="flex">
	<Form
		remoteForm={createIncomingTransaction}
		legend="Enter Delivery Order"
		errorMsg="Failed to submit DO"
		successMsg="DO added"
		onSuccess={() => {
			items = [];
		}}
	>
		<Input
			label="Delivery Date"
			type="date"
			field={date}
			value={new Date().toISOString().split('T')[0]}
		/>
		<Combobox
			label="Supplier"
			field={supplier}
			list={data.suppliers}
			subtitle="New suppliers can be added as needed"
			placeholder="Enter supplier name"
		/>
		<Input
			label="DO Number"
			field={deliveryID}
			type="text"
			placeholder="Enter delivery order number"
		/>
		<div class="divider mt-0"></div>
		<fieldset class="mb-4">
			<TransactionItemForm {items} />
			<InputIssues field={ids} />
			<TransactionItemTable bind:items />
		</fieldset>
		<button class="btn btn-soft btn-primary">Add Delivery Order</button>
	</Form>
	<div class="ms-10 me-10 mt-5 w-full">
		<TransactionAccordion transactions={data.transactions} />
	</div>
</div>
