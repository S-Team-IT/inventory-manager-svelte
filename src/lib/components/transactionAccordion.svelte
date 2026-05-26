<script lang="ts">
	import type { CompleteIncomingTransaction } from '$lib/types/types';

	type Props = {
		transactions: CompleteIncomingTransaction[];
	};

	const { transactions }: Props = $props();
</script>

{#each transactions as { id, createdAt, deliveryDate, supplier, deliveryID, items } (id)}
	<details class="collapse border border-base-300 bg-base-100" name="my-accordion-det-1" open>
		<summary class="collapse-title font-semibold">{deliveryID} {createdAt}</summary>
		<div class="collapse-content text-sm">
			<ul>
				{#each items as item, i (i)}
					<li>{item.id} {item.name} {item.quantity}</li>
				{/each}
			</ul>
		</div>
	</details>
{/each}
