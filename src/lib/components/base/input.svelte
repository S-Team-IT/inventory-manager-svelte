<script lang="ts">
	import InputIssues from './inputIssues.svelte';

	const { label, type, field, placeholder = '', value = '' } = $props();
</script>

<div class="mb-4">
	<label class="input w-full">
		<span class="label">{label}:</span>
		<input {...field.as(type, value)} {placeholder} />
	</label>
	<InputIssues {field} />
</div>
