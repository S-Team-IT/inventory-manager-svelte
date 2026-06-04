<script lang="ts">
	import InputIssues from '$lib/components/base/inputIssues.svelte';
	import { createIncomingTransaction } from '$lib/remote/transaction.remote.js';
	import type { Item } from '$lib/types/databaseTypes.js';
	import { truncateString } from '$lib/utils/stringTransform.js';

	const { ids, quantities } = createIncomingTransaction.fields;

	type Props = {
		items: Item[];
	};

	const { items = $bindable() }: Props = $props();
</script>

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
