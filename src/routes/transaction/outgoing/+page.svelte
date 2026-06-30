<script lang="ts">
	import Input from '$lib/components/base/input.svelte';
	import TransactionForm from '$lib/components/transactionForm.svelte';
	import { createOutgoingTransaction } from '$lib/remote/transaction.remote.js';

	const { data } = $props();

	const { date, expender, remarks } = createOutgoingTransaction.fields;
</script>

<svelte:head>
	<title>Add item expenditure</title>
</svelte:head>

<TransactionForm
	remoteForm={createOutgoingTransaction}
	legend="Enter Expenditure"
	errorMsg="Failed to submit"
	successMsg="Successfully added"
	transactions={data.transactions}
	><Input
		label="Use Date"
		type="date"
		field={date}
		value={new Date().toISOString().split('T')[0]} />
	<Input label="User" type="text" field={expender} placeholder="John" subtitle="Who used it" />
	<Input label="Remarks" field={remarks} type="text" placeholder="E.g. Area item was used at" />
</TransactionForm>
