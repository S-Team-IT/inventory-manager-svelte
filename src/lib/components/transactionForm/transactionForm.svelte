<script lang="ts">
	import TransactionAccordionGroup from '$lib/components/accordions/transactionAccordionGroup.svelte';
	import Form from '$lib/components/base/form.svelte';
	import InputIssues from '$lib/components/base/inputIssues.svelte';
	import TransactionItemForm from '$lib/components/transactionForm/transactionItemForm.svelte';
	import TransactionItemTable from '$lib/components/transactionForm/transactionItemTable.svelte';
	import { createIncomingTransaction } from '$lib/remote/transaction.remote.js';
	import type { Item } from '$lib/types/databaseTypes.js';

	const { ids } = createIncomingTransaction.fields;

	const { remoteForm, legend, errorMsg, successMsg, children, transactions } = $props();
	let items = $state<Item[]>([]);
</script>

<div class="flex">
	<Form
		{remoteForm}
		{legend}
		{errorMsg}
		{successMsg}
		onSuccess={() => {
			items = [];
		}}>
		{@render children()}
		<div class="divider mt-0"></div>
		<fieldset class="mb-4">
			<TransactionItemForm {items} />
			<InputIssues field={ids} />
			<TransactionItemTable bind:items />
		</fieldset>
		<button class="btn btn-soft btn-primary">Submit</button>
	</Form>
	<div class="ms-10 me-10 mt-5 w-full">
		<TransactionAccordionGroup {transactions} />
	</div>
</div>
