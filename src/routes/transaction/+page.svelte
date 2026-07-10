<script lang="ts">
	import TransactionAccordionGroup from '$lib/components/accordions/transactionAccordionGroup.svelte';
	import type { CompleteTransaction } from '$lib/types/databaseTypes.js';
	import { formatYearMonthDay } from '$lib/utils/dateFns.js';
	import { toast } from 'svelte-sonner';

	const { data } = $props();

	let isTransactionsReversed = $state<boolean>(true);
	let transactionsReversed = $derived(data.transactions.toReversed());
	let searchString = $state<string>('');
	let transactionsToDisplay = $derived.by(() => {
		let transactionsByDate = isTransactionsReversed ? transactionsReversed : data.transactions;
		let transactionsByString = transactionsByDate.filter(
			({ deliveryDate, expendDate, deliveryRef, expender, remarks, supplier }) => {
				const date = formatYearMonthDay((deliveryDate || expendDate)!);
				const fieldsToSearch = [date, deliveryRef, supplier, expender, remarks];

				return fieldsToSearch.some((field) =>
					String(field).toLowerCase().includes(searchString.toLowerCase())
				);
			}
		);

		switch (selectedType) {
			case 'incoming':
				return transactionsByString.filter(({ deliveryDate }) => deliveryDate);
			case 'outgoing':
				return transactionsByString.filter(({ expendDate }) => expendDate);
			default:
				return transactionsByString;
		}
	});

	let selectedType = $state<string>();

	function toggleTransactionsReversed() {
		isTransactionsReversed = !isTransactionsReversed;
	}

	// This function is here because sometimes it can be hard to know that the list has updated.
	function handleSelectedTypeChange() {
		toast.info(`Viewing ${selectedType} transactions`);
	}
</script>

<svelte:head>
	<title>Transactions</title>
</svelte:head>

<div class="filter-buttons-group">
	<button class="btn btn-primary" onclick={toggleTransactionsReversed}>
		Date <span class={isTransactionsReversed ? 'icon-[mdi--arrow-up]' : 'icon-[mdi--arrow-down]'}>
		</span>
	</button>
	<select bind:value={selectedType} class="select w-30" onchange={handleSelectedTypeChange}>
		<option value="all" selected>All</option>
		<option value="incoming">Incoming</option>
		<option value="outgoing">Outgoing</option>
	</select>
	<input
		type="text"
		bind:value={searchString}
		class="input w-50"
		placeholder="Search"
		spellcheck="false" />
</div>
<div class="m-5">
	<TransactionAccordionGroup transactions={transactionsToDisplay as CompleteTransaction[]} />
</div>
