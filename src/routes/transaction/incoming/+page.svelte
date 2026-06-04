<script lang="ts">
	import Combobox from '$lib/components/base/combobox.svelte';
	import Input from '$lib/components/base/input.svelte';
	import TransactionForm from '$lib/components/transactionForm.svelte';
	import { createIncomingTransaction } from '$lib/remote/transaction.remote.js';

	const { date, supplier, deliveryID } = createIncomingTransaction.fields;

	const { data } = $props();
</script>

<TransactionForm
	remoteForm={createIncomingTransaction}
	legend="Enter Delivery Order"
	errorMsg="Failed to submit DO"
	successMsg="DO added"
	transactions={data.transactions}
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
</TransactionForm>
