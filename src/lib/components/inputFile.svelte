<script lang="ts">
	import InputIssues from './inputIssues.svelte';

	const { label, type, field, subtitle } = $props();

	function onclick() {
		field.set(undefined);
	}

	let fileCount = $derived.by(() => {
		const value = field.value();
		if (value === undefined) return 0;
		if (value.length) return value.length;
		return 1;
	});
</script>

<div class="mb-4">
	<fieldset class="fieldset gap-0 p-0">
		<legend class="fieldset-legend pt-0">{label}</legend>
		<div class="flex flex-row">
			<label for={`${label}-file-input`} class="input flex-1 rounded-e-none">Select file</label>
			<label for={`${label}-file-input`} class="input rounded-none">{fileCount} selected</label>
			<input {...field.as(type)} class="hidden" id={`${label}-file-input`} />
			<button class="btn rounded-s-none btn-secondary" aria-label="clear" type="button" {onclick}>
				<span class="icon-[mdi--clear]"></span>
			</button>
		</div>
		<span class="label">{subtitle}</span>
	</fieldset>
	<InputIssues {field} />
</div>
