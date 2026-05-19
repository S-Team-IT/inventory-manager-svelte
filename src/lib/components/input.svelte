<script lang="ts">
	import InputIssues from '$lib/components/inputIssues.svelte';

	const {
		label,
		type,
		field,
		oninput = () => {
			console.log('NO ONINPUT');
		},
		placeholder = '',
		value = ''
	} = $props();
</script>

<div class="mb-4">
	<label class="input w-full">
		<span class="label">{label}:</span>
		<input {...field.as(type, value)} {placeholder} {oninput} />
	</label>
	<InputIssues {field} />
</div>
