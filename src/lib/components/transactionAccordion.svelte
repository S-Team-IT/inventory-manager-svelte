<script lang="ts">
	import { deleteTransaction } from '$lib/remote/transaction.remote';
	import type { CompleteTransaction } from '$lib/types/databaseTypes';
	import { formatRelativeCustom, formatYearMonthDay } from '$lib/utils/dateTransform';
	import { toast } from 'svelte-sonner';

	type Props = {
		transaction: CompleteTransaction;
		isIncoming: boolean;
		uniqueID: string;
	};

	const { transaction, isIncoming, uniqueID }: Props = $props();
	const {
		id,
		createdAt,
		deliveryDate,
		supplier,
		deliveryID,
		expendDate,
		expender,
		remarks,
		items
	} = $derived(transaction);

	function openDeleteConfirmation() {
		const modal = document.querySelector(`#${uniqueID}`);
		(modal as HTMLDialogElement).showModal();
	}

	function closeDeleteConfirmation() {
		const modal = document.querySelector(`#${uniqueID}`);
		(modal as HTMLDialogElement).close();
	}
	const uniqueForm = $derived(deleteTransaction.for(uniqueID));
</script>

<details class="collapse border border-base-300 bg-base-100" name="my-accordion-det-1">
	<summary class="collapse-title font-semibold">
		<div class="flex items-center justify-between gap-10">
			{#if isIncoming}
				<span>
					{supplier}
					{formatYearMonthDay(deliveryDate!)}
					{deliveryID}
				</span>
			{:else}
				<span>
					{expender}
					{formatYearMonthDay(expendDate!)}
					{remarks}
				</span>
			{/if}
			<span>
				{formatRelativeCustom(createdAt)}
				<button
					class="btn size-12.5 btn-soft btn-error"
					aria-label="delete"
					onclick={openDeleteConfirmation}
				>
					<span class="icon-[tabler--trash]"></span>
				</button>
			</span>
		</div>
	</summary>
	<div class="collapse-content text-sm">
		<ul>
			{#each items as item, i (i)}
				<li class="ms-6 list-disc">
					#{item.master}
					{item.name}
					{isIncoming ? '+' : '-'}{item.quantity}
				</li>
			{/each}
		</ul>
	</div>
</details>

<dialog id={uniqueID} class="modal">
	<div class="modal-box">
		<h2 class="text-lg">Are you sure you want to delete this transaction?</h2>
		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-soft btn-secondary">Cancel</button>
			</form>
			<form
				{...uniqueForm.enhance(async ({ submit }) => {
					if (await submit()) {
						closeDeleteConfirmation();
						const { success, message } = uniqueForm.result!;
						if (success) {
							toast.success('Transaction has been deleted.');
						} else {
							toast.error(message || 'Failed to delete transaction.');
						}
					}
				})}
			>
				<input {...uniqueForm.fields.id.as('hidden', id)} />
				<input {...uniqueForm.fields.isIncoming.as('checkbox', isIncoming)} class="invisible" />
				<button class="btn btn-primary">Confirm</button>
			</form>
		</div>
	</div>
</dialog>
