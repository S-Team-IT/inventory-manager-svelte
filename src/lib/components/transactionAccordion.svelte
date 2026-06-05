<script lang="ts">
	import type { CompleteTransaction } from '$lib/types/databaseTypes';
	import { formatRelativeCustom } from '$lib/utils/dateTransform';

	type Props = {
		transactions: CompleteTransaction[];
	};

	const { transactions }: Props = $props();
</script>

{#each transactions as { id, createdAt, supplier, deliveryID, expender, remarks, items } (id)}
	<details class="collapse border border-base-300 bg-base-100" name="my-accordion-det-1">
		<summary class="collapse-title font-semibold">
			<div class="flex items-center justify-between gap-10">
				<span
					>{supplier || expender}{deliveryID ? ` ${deliveryID}` : remarks ? `, ${remarks}` : ''}
				</span>
				<span>
					{formatRelativeCustom(createdAt)}
					<button class="btn ms-2 btn-soft btn-accent" aria-label="focus">
						<span class="icon-[ion--navigate]"></span>
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
						{deliveryID ? '+' : '-'}{item.quantity}
					</li>
				{/each}
			</ul>
		</div>
	</details>
{/each}
