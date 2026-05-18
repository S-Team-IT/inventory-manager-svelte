<script lang="ts">
	const { data } = $props();
</script>

{#if data.user}
	<h1>Hello, {data.user.name}</h1>
{/if}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
