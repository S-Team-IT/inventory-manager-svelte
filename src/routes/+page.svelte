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

<img
	class="opacity-50"
	src="src/lib/assets/View_of_MBS_from_the_gardens_(8026531707).jpg"
	alt="MBS" />
