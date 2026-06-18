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

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Welcome to the STeam Inventory Manager</h1>
<p>Navigate using the navigation bar at the top</p>
