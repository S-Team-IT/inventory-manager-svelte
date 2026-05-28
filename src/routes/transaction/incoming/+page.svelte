<script lang="ts">
	import Combobox from '$lib/components/base/combobox.svelte';
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import InputIssues from '$lib/components/base/inputIssues.svelte';
	import TransactionAccordion from '$lib/components/transactionAccordion.svelte';
	import { getItemNameByMaster } from '$lib/remote/item.remote.js';
	import { createIncomingTransaction } from '$lib/remote/transaction.remote.js';
	import type { ItemTransaction } from '$lib/types/databaseTypes.js';
	import { truncateString } from '$lib/utils/stringTransform.js';
	import { toast } from 'svelte-sonner';

	const { date, supplier, deliveryID, ids, quantities } = createIncomingTransaction.fields;

	const { data } = $props();
	let masterInput = $state<string>('');
	let items = $state<ItemTransaction[]>([]);
</script>

<div class="flex">
	<Form
		remoteForm={createIncomingTransaction}
		legend="Enter Delivery Order"
		errorMsg="Failed to submit DO"
		successMsg="DO added"
		onSuccess={() => {
			items = [];
			masterInput = '';
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
			<label class="input mb-2 w-full pr-0">
				<span class="label">Add items:</span>
				<input type="text" bind:value={masterInput} placeholder="Enter master number" />
				<button
					aria-label="add-item"
					class="btn rounded-s-none btn-secondary"
					type="button"
					onclick={async () => {
						const result = await getItemNameByMaster(masterInput.toLowerCase().trim()).run();
						if (!result) {
							toast.error(`Master number ${masterInput} not found.`);
							return;
						}

						const newItem = {
							id: result.id,
							master: masterInput,
							name: result.name,
							quantity: 1
						};
						items.push(newItem);
					}}><span class="icon-[ic--baseline-plus]"></span></button
				>
			</label>
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
	<div>
		<TransactionAccordion transactions={data.transactions} />
	</div>
</div>
