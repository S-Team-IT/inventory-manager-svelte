<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { signIn } from '$lib/remote/auth.remote';
	const { email, password } = signIn.fields;

	let isLoading: boolean = $state(false);
	let isFilling: boolean = $state(true);

	const onclick = () => {
		isFilling = true;
	};
</script>

<form
	{...signIn.enhance(async ({ form, submit }) => {
		isLoading = true;
		if (await submit()) {
			isFilling = false;
			if (signIn.result?.success) form.reset();
		}

		isLoading = false;
	})}
>
	<fieldset
		class="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4"
		disabled={isLoading}
	>
		<legend class="fieldset-legend text-xl">Login</legend>
		<Input label="Email" type="email" field={email} {onclick} placeholder="John" />
		<Input
			label="Password"
			type="password"
			field={password}
			{onclick}
			placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
		/>
		<button type="submit" class="btn">Sign in</button>
		{#if isLoading}
			<p>Loading...</p>
		{/if}
		{#if signIn.result && !isFilling}
			{#if !signIn.result.success}
				<p class="issue">Invalid credentials</p>
			{:else}
				<p class="text-green-600">Signed in</p>
			{/if}
		{/if}
	</fieldset>
</form>
