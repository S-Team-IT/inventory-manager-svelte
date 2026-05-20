<script lang="ts">
	const { field } = $props();
</script>

{#each field.issues() as issue, i (i)}
	<p class="issue">{issue.message}</p>
{/each}
