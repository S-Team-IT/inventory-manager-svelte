<script lang="ts">
	import { beforeNavigate, invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import faviconBlack from '$lib/assets/faviconBlack.ico';
	// import faviconWhite from '$lib/assets/faviconWhite.ico';
	// import logoBlack from '$lib/assets/logoBlack.webp';
	import logoWhite from '$lib/assets/logoWhite.webp';
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
	<link rel="icon" href={faviconBlack} />
</svelte:head>

<div class="navbar z-999 bg-base-100 shadow-sm">
	<div class="navbar-start space-x-2 text-xl">
		<a class="h-auto w-30 p-2" href={resolve('/')}><img src={logoWhite} alt="Logo" /></a>
		<div class="dropdown">
			<div tabindex="0" role="button" class="m-1 cursor-pointer text-2xl">Items</div>
			<ul
				tabindex="-1"
				class="dropdown-content menu z-1 w-52 rounded-box bg-blue-500 p-2 text-white shadow-sm">
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
				class="dropdown-content menu z-1 w-52 rounded-box bg-blue-500 p-2 shadow-sm">
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
				<div class="flex flex-row">
					<div class="mr-2 flex flex-col text-center">
						<span class="align-middle text-xl">{data.user.name}</span>
						<span class="text-sm">{data.user.role}</span>
					</div>
					<div tabindex="0" role="button" class="btn avatar btn-circle btn-ghost">
						<span class="icon-[radix-icons--avatar] h-full w-full"></span>
					</div>
				</div>
				<ul
					tabindex="-1"
					class="dropdown-content menu z-1 w-52 rounded-box bg-blue-500 p-2 shadow-sm">
					<li>
						<a
							class="justify-between"
							href={resolve('/user/[slug]', {
								slug: data.user.id
							})}>
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
