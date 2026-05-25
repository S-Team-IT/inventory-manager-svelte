<script lang="ts">
	import Combobox from '$lib/components/base/combobox.svelte';
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import { getItemName } from '$lib/remote/item.remote.js';
	import { createTransaction } from '$lib/remote/transaction.remote.js';
	import {} from 'os';
	import { toast } from 'svelte-sonner';

	type itemQuantity = {
		master: string;
		name: string;
		quantity: number;
	};

	const { date, supplier, id, masters, quantities } = createTransaction.fields;

	const { data } = $props();
	let masterInput = $state<string>('');
	let items = $state<itemQuantity[]>([]);

	function truncateString(str: string, maxLength: number): string {
		if (str.length <= maxLength) return str;
		return str.slice(0, maxLength - 3) + '...';
	}
</script>

<Form
	remoteForm={createTransaction}
	legend="Enter Delivery Order"
	errorMsg="Failed to submit DO"
	successMsg="DO added"
>
	<Input label="Delivery Date" type="date" field={date} />
	<Combobox
		label="Supplier"
		field={supplier}
		list={data.suppliers}
		subtitle="New suppliers can be added as needed"
	/>
	<Input label="DO Number" field={id} type="text" />
	<div class="divider mt-0"></div>
	<fieldset class="mb-4">
		<label class="input mb-2 w-full pr-0">
			<span class="label">Add items:</span>
			<input type="text" bind:value={masterInput} />
			<button
				class="btn rounded-s-none btn-primary"
				type="button"
				onclick={async () => {
					const result = await getItemName(masterInput.toLowerCase().trim()).run();
					if (!result) {
						toast.error(`Master number ${masterInput} not found.`);
						return;
					}

					const newItem = {
						master: masterInput,
						name: result.name,
						quantity: 0
					};
					items.push(newItem);
				}}>Add item</button
			>
		</label>
		<table class="table table-zebra">
			<thead>
				<tr>
					<th class="w-15">Master</th>
					<th>Name</th>
					<th class="w-10">Qty</th>
				</tr>
			</thead>
			<tbody>
				{#each items as { master, name, quantity }, i (i)}
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
								min="0"
							/>
							<input {...masters[i].as('hidden', master)} />
							<input {...quantities[i].as('hidden', quantity)} />
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</fieldset>
	<button class="btn btn-primary">Add</button>
</Form>
