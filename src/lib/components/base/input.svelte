<script lang="ts">
	import InputIssues from './inputIssues.svelte';

	const {
		label = '',
		type,
		field,
		placeholder = '',
		value = '',
		rightButton = '',
		subtitle = ''
	} = $props();
</script>

<div class="mb-4">
	<label class="input w-full pr-0">
		{#if label}
			<span class="label">{label}: </span>
		{/if}
		<input {...field.as(type, value)} {placeholder} />
		{#if rightButton !== ''}
			<button class="btn rounded-s-none btn-primary">{rightButton}</button>
		{/if}
	</label>
	{#if subtitle}
		<span class="label">{subtitle}</span>
	{/if}
	<InputIssues {field} />
</div>
