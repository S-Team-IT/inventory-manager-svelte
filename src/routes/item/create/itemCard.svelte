<script lang="ts">
	import type { Item } from '$lib/types/databaseTypes';

	const { masterNumber, name, category, categoryID, supplier, supplierID, quantity }: Item =
		$props();
</script>

<h1>{masterNumber}| {name}</h1>
<div>
	Category: {categoryID} | {category} <br />
	Supplier: {supplierID} | {supplier}<br />
	Quantity: {quantity}
</div>
