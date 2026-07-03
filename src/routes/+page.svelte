<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import mbsSrc from '$lib/assets/mbs.jpg';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	const { data } = $props();

	onMount(() => {
		if (data.redirectMessage) {
			toast.success(data.redirectMessage);
			goto(resolve('/'));
		}
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<img class="opacity-90" src={mbsSrc} alt="MBS" />
