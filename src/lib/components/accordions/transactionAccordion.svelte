<script lang="ts">
	import { deleteTransaction } from '$lib/remote/transaction.remote';
	import type { CompleteTransaction } from '$lib/types/databaseTypes';
	import type { EnhanceParams } from '$lib/types/types';
	import { localeCompareSort } from '$lib/utils/transforms/arrays';
	import { formatRelativeCustom, formatYearMonthDay } from '$lib/utils/transforms/dates';
	import type { SvelteComponent } from 'svelte';
	import { toast } from 'svelte-sonner';
	import Accordion from './accordion.svelte';

	type Props = {
		transaction: CompleteTransaction;
		isIncoming: boolean;
		elementID: string;
	};

	const { transaction, isIncoming, elementID }: Props = $props();

	const {
		id,
		createdAt,
		deliveryDate,
		supplier,
		deliveryRef,
		purchaseRef,
		invoiceRef,
		expendDate,
		expender,
		remarks,
		items
	} = $derived(transaction);
	const sortedItems = $derived(items.sort((a, b) => localeCompareSort(a.master, b.master)));
	const uniqueForm = $derived(deleteTransaction.for(elementID));

	let accordionRef: SvelteComponent;
</script>

<Accordion
	bind:this={accordionRef}
	{elementID}
	{summaryStart}
	{summaryEnd}
	{content}
	{deleteForm}
	deletePrompt="Are you sure you want to delete this transaction?">
</Accordion>

{#snippet summaryStart()}
	{#if isIncoming}
		<span>
			{supplier}
			{formatYearMonthDay(deliveryDate!)}
			{deliveryRef}
		</span>
	{:else}
		<span>
			{expender}
			{formatYearMonthDay(expendDate!)}
			{remarks}
		</span>
	{/if}
{/snippet}

{#snippet summaryEnd()}
	{#if expendDate}
		<span class="outgoing-text text-center text-2xl">OUT</span>
	{:else}
		<span class="incoming-text text-center text-2xl">INC</span>
	{/if}
	<span class="mr-5 ml-5">{formatRelativeCustom(createdAt)}</span>
{/snippet}

{#snippet content()}
	<div class="divider"></div>
	{#if purchaseRef}
		<div>PO: {purchaseRef}</div>
	{/if}
	{#if invoiceRef}
		<div>Invoice: {invoiceRef}</div>
	{/if}
	<ul class="mt-2">
		{#each sortedItems as item, i (i)}
			<li class="mb-2 list-none">
				<pre class="inline">#{item.master.padEnd(5, ' ')}</pre>
				<pre class="inline">{isIncoming ? '+' : '-'}{String(item.quantity).padEnd(5, ' ')}</pre>
				<span>{item.name}</span>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet deleteForm()}
	<form
		{...uniqueForm.enhance(async ({ submit }: EnhanceParams) => {
			if (await submit!()) {
				accordionRef.closeDeleteConfirmation();
				const { success, message } = uniqueForm.result!;
				if (success) {
					toast.success('Transaction has been deleted');
				} else {
					toast.error(message || 'Failed to delete transaction.');
				}
			}
		})}>
		<input {...uniqueForm.fields.id.as('hidden', id)} />
		<input {...uniqueForm.fields.isIncoming.as('checkbox', isIncoming)} class="invisible" />
		<button class="btn btn-primary">Confirm</button>
	</form>
{/snippet}
