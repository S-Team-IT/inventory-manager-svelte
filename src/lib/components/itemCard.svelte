<script lang="ts">
	import ImageModal from '$lib/components/imageModal.svelte';
	import type { Item } from '$lib/types/databaseTypes';

	const { masterNumber, name, category, supplier, quantity, thumbnail, photos }: Item = $props();
</script>

<div class="card bg-accent shadow-sm">
	<ImageModal id={masterNumber} thumbnailSrc={thumbnail} gallerySrc={photos} />
	<div class="card-body">
		<h2 class="card-title">{name}</h2>
		<p>
			Category: {category} <br />
			Supplier: {supplier} <br />
			Quantity: {quantity}
		</p>
	</div>
</div>
