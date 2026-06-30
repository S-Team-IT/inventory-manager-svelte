<script lang="ts">
	type Props = {
		thumbnailFile: File | undefined;
		galleryFiles: (File | undefined)[];
	};
	const { thumbnailFile, galleryFiles }: Props = $props();

	let thumbnailUrl = $derived.by((): string => {
		if (thumbnailFile) {
			const imageUrl = URL.createObjectURL(thumbnailFile);
			return imageUrl;
		}
		return '';
	});
	let photoUrls = $derived.by((): string[] => {
		if (!galleryFiles) return [];
		const urlList: string[] = [];
		galleryFiles.forEach((file) => {
			if (!file) return;
			const imageUrl = URL.createObjectURL(file);
			urlList.push(imageUrl);
		});
		return urlList;
	});
</script>

{#if thumbnailUrl}
	<h2>Thumbnail</h2>
	<img
		class="max-w-50"
		src={thumbnailUrl}
		alt="thumbnail preview"
		onload={() => URL.revokeObjectURL(thumbnailUrl)} />
{/if}
{#if photoUrls.length !== 0}
	<h2>Gallery</h2>
	<div class="grid grid-cols-2 gap-2">
		{#each photoUrls as url, i (i)}
			<img
				class="max-w-50"
				src={url}
				alt="Gallery img #{i}"
				onload={() => URL.revokeObjectURL(url)} />
		{/each}
	</div>
{/if}
