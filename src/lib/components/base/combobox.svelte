<script lang="ts">
	import type { Generic } from '$lib/types/databaseTypes';
	import InputIssues from './inputIssues.svelte';

	const {
		label,
		field,
		list,
		subtitle = '',
		placeholder = '',
		rightButton = '',
		value = ''
	} = $props();

	let inputValue = $derived.by(() => {
		if (!field.value()) return '';
		const str: string = field.value();
		return str.toLowerCase();
	});
	let filteredList = $derived.by(() =>
		(list as Generic[]).filter(({ name }) => name.toLowerCase().includes(inputValue))
	);
</script>

<div class="mb-4">
	<label class="input w-full pr-0">
		<span class="label">{label}:</span>
		<input list={`${label}-list`} {...field.as('text', value)} {placeholder} spellcheck="false" />
		{#if rightButton}
			<button class="btn rounded-s-none btn-primary">{rightButton}</button>
		{/if}
	</label>
	<span class="label">{subtitle}</span>
	<InputIssues {field} />
</div>

<datalist id={`${label}-list`}>
	{#each filteredList as { id, name } (id)}
		<option value={name}></option>
	{/each}
</datalist>

<!-- <label class="input w-full">
	<span class="label">{label}:</span>
	<input
		list="combobox-list"
		value={input}
		oninput={(e) => (input = e.currentTarget.value.replace('Add', '').replaceAll(`"`, '').trim())}
	/>
</label>
<span class="label">{subtitle}</span>

<datalist id="combobox-list">
	{#each filteredList as { id, name } (id)}
		<option value={name}></option>
	{/each}
	{#if filteredList?.length !== suppliers?.length}
		<option value={`Add "${input}"`}></option>
	{/if}
</datalist> -->
