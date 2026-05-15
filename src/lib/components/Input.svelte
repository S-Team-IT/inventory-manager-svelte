<script lang="ts">
	const { label, type, field, onclick, placeholder = '' } = $props();
</script>

<label class="input">
	<span class="label">{label}:</span>
	<input {...field.as(type)} {placeholder} {onclick} />
</label>
{#each field.issues() as issue, i (i)}
	<p class="issue">{issue.message}</p>
{/each}
