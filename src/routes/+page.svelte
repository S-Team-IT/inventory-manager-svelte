<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	const { data } = $props();

	onMount(() => {
		if (data.wasRedirected) {
			toast.success('Logged in');
			goto(resolve('/'));
		}
	});
</script>

{#if data.user}
	<h1>Hello, {data.user.name}</h1>
{/if}

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
