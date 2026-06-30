<script lang="ts">
	import { beforeNavigate, invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.ico';
	import { signOut } from '$lib/remote/auth.remote';
	import { toast, Toaster } from 'svelte-sonner';
	import './layout.css';

	let { children, data } = $props();

	beforeNavigate((navigate) => {
		toast.promise(navigate.complete, {
			loading: 'Loading...'
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="navbar bg-base-100 shadow-sm">
	<div class="z-999 navbar-start space-x-2 text-xl">
		<!-- <a class="btn text-2xl" href={resolve('/')}>Home</a> -->
		<div class="dropdown">
			<div tabindex="0" role="button" class="m-1 cursor-pointer text-2xl">Items</div>
			<ul
				tabindex="-1"
				class="dropdown-content menu z-1 w-52 rounded-box bg-blue-500 p-2 text-white shadow-sm"
			>
				<li><a href={resolve('/item')}>Item List</a></li>
				{#if ['Admin', 'QS'].includes(data.user?.role ?? '')}
					<li><a href={resolve('/item/new')}>Add Item</a></li>
				{/if}
				{#if ['Admin', 'QS'].includes(data.user?.role ?? '')}
					<li><a href={resolve('/item/timeline')}>Weekly Balance</a></li>
				{/if}
			</ul>
		</div>
		<div class="dropdown">
			<div tabindex="0" role="button" class="m-1 cursor-pointer text-2xl">Transactions</div>
			<ul
				tabindex="-1"
				class="dropdown-content menu z-1 w-52 rounded-box bg-blue-500 p-2 shadow-sm"
			>
				<li><a class="" href={resolve('/transaction')}>Transaction List</a></li>
				{#if ['Admin', 'Procurement'].includes(data.user?.role ?? '')}
					<li><a href={resolve('/transaction/incoming')}>Add Delivery Order</a></li>
				{/if}
				{#if ['Admin', 'Project'].includes(data.user?.role ?? '')}
					<li><a href={resolve('/transaction/outgoing')}>Expenditure</a></li>
				{/if}
			</ul>
		</div>
	</div>
	<div class="navbar-center"></div>
	<div class="me-2 navbar-end">
		{#if data.user}
			<div class="dropdown dropdown-end">
				<span>{data.user.role}</span>
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
						{#if data.user.role === 'Admin'}
							<a href={resolve('/user/new')}>Add new user</a>
						{/if}
						<button
							onclick={async () => {
								await signOut(data.session!.id);
								invalidateAll();
								toast.success('Signed out');
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

<Toaster richColors position="bottom-right" duration={2000} />
