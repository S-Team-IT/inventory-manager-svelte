<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.ico';
	import { signOut } from '$lib/remote/auth.remote';
	import { Toaster } from 'svelte-sonner';
	import './layout.css';

	let { children, data } = $props();
</script>

<svelte:head>
	<title>Webi Wabo 3</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="navbar bg-base-100 shadow-sm">
	<div class="navbar-start space-x-2 text-xl">
		<a class="btn text-2xl" href={resolve('/')}>Home</a>
		<div class="dropdown">
			<div tabindex="0" role="button" class="m-1 cursor-pointer">Items</div>
			<ul
				tabindex="-1"
				class="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
			>
				<li><a href={resolve('/item')}>Item List</a></li>
				<div class="divider m-0.5">QS</div>
				<li><a href={resolve('/item/create')}>Add Item</a></li>
				<div class="divider m-0.5">Procurement</div>
				<li><a href={resolve('/item/add')}>Add Delivery Order</a></li>
				<div class="divider m-0.5">Project</div>
				<li><a href={resolve('/item/subtract')}>Remove Quantity</a></li>
			</ul>
		</div>
	</div>
	<div class="navbar-center"></div>
	<div class="me-2 navbar-end">
		{#if data.user}
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn avatar btn-circle btn-ghost">
					<div class="w-10 rounded-full bg-green-600"></div>
				</div>
				<ul
					tabindex="-1"
					class="dropdown-content menu z-1 w-52 rounded-box bg-base-100 p-2 shadow-sm"
				>
					<li>
						<a
							class="justify-between"
							href={resolve('/user/[slug]', {
								slug: '1'
							})}
						>
							Profile
						</a>
						<a href={resolve('/user/create')}>Add new user</a>
						<button
							onclick={async () => {
								await signOut(data.session.id);
								invalidateAll();
							}}
							>Sign out
						</button>
					</li>
				</ul>
			</div>
		{:else}
			<a class="btn" href={resolve('/user/sign-in')}>Sign in</a>
		{/if}
	</div>
</div>

{@render children()}

<Toaster richColors position="bottom-right" />
