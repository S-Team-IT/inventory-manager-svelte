<script lang="ts">
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import InputIssues from '$lib/components/base/inputIssues.svelte';
	import TransactionAccordion from '$lib/components/transactionAccordion.svelte';
	import TransactionItemForm from '$lib/components/transactionItemForm.svelte';
	import { createOutgoingTransaction } from '$lib/remote/transaction.remote.js';
	import type { Item } from '$lib/types/databaseTypes';
	import { truncateString } from '$lib/utils/stringTransform.js';

	const { data } = $props();

	const { date, expender, remarks, ids, quantities } = createOutgoingTransaction.fields;

	let items = $state<Item[]>([]);
</script>

<div class="flex">
	<Form
		remoteForm={createOutgoingTransaction}
		legend="Enter Expenditure"
		errorMsg="Failed to submit"
		successMsg="Successfully added"
		onSuccess={() => {
			items = [];
		}}
	>
		<Input
			label="Use Date"
			type="date"
			field={date}
			value={new Date().toISOString().split('T')[0]}
		/>
		<Input label="User" type="text" field={expender} placeholder="John" subtitle="Who used it" />
		<Input label="Remarks" field={remarks} type="text" placeholder="E.g. Area item was used at" />
		<div class="divider mt-0"></div>
		<fieldset class="mb-4">
			<TransactionItemForm {items} />
			<InputIssues field={ids} />
			<table class="table table-zebra">
				<thead>
					<tr>
						<th class="w-15">Master</th>
						<th>Name</th>
						<th class="w-10">Qty</th>
					</tr>
				</thead>
				<tbody>
					{#each items as { id, master, name, quantity }, i (i)}
						<tr>
							<th class="w-15">{master}</th>
							<th>{truncateString(name, 20)}</th>
							<th
								><input
									class="w-10 border ps-1"
									type="number"
									id={`input${i}`}
									name={`input${i}`}
									bind:value={items[i].quantity}
									step="1"
									min="1"
								/>
								<InputIssues field={quantities[i]} />
								<input {...ids[i].as('hidden', id)} />
								<input {...quantities[i].as('hidden', quantity)} />
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</fieldset>
		<button class="btn btn-soft btn-primary">Add Delivery Order</button>
	</Form>
	<div class="ms-10 me-10 mt-5 w-full">
		<TransactionAccordion transactions={data.transactions} />
	</div>
</div>
