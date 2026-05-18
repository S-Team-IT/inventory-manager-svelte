<script lang="ts">
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

<label class="input w-full">
	<span class="label">{label}:</span>
	<input {...field.as(type, value)} {placeholder} {oninput} />
</label>
{#each field.issues() as issue, i (i)}
	<p class="issue">{issue.message}</p>
{/each}
