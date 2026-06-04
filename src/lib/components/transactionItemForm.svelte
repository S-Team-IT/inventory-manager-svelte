<script lang="ts">
	import { getItemNameByMaster } from '$lib/remote/item.remote.js';
	import type { Item } from '$lib/types/databaseTypes.js';
	import { toast } from 'svelte-sonner';

	type Props = {
		items: Item[];
	};

	const { items }: Props = $props();
	let masterInput = $state<string>('');
	let isLoading = $state<boolean>(false);
</script>

<label class="input mb-2 w-full pr-0">
	<span class="label">Add items:</span>
	<input type="text" bind:value={masterInput} placeholder="Enter master number" />
	<button
		aria-label="add-item"
		class="btn rounded-s-none btn-secondary"
		type="button"
		disabled={isLoading}
		onclick={async () => {
			isLoading = true;
			if (items.some((item) => item.master === masterInput)) {
				toast.error('Item already in table');
				isLoading = false;
				return;
			}
			const result = await getItemNameByMaster(masterInput.toLowerCase().trim()).run();
			if (!result) {
				toast.error(`Master number ${masterInput} not found.`);
			} else {
				const newItem: Item = {
					id: result.id,
					master: masterInput,
					name: result.name,
					quantity: 1
				};
				items.push(newItem);
			}
			isLoading = false;
		}}><span class="icon-[ic--baseline-plus]"></span></button
	>
</label>
<p>{isLoading ? 'Loading...' : ''}</p>
