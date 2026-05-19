<script lang="ts">
	import InputIssues from './inputIssues.svelte';

	const { label, type, field, subtitle } = $props();
</script>

<div class="mb-4">
	<fieldset class="fieldset gap-0 p-0">
		<legend class="fieldset-legend pt-0">{label}</legend>
		<input {...field.as(type)} class="file-input" />
		<span class="label">{subtitle}</span>
	</fieldset>
	<InputIssues {field} />
</div>
