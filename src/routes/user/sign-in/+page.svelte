<script lang="ts">
	import { signIn } from '$lib/remote/auth.remote';
	const { email, password } = signIn.fields;

	let isLoading: boolean = $state(false);
	let isFilling: boolean = $state(true);
</script>

<form
	{...signIn.enhance(async ({ form, submit }) => {
		isLoading = true;
		if (await submit()) {
			isFilling = false;
			if (signIn.result.success) form.reset();
		}

		isLoading = false;
	})}
>
	<fieldset
		class="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4"
		disabled={isLoading}
	>
		<legend class="fieldset-legend text-xl">Login</legend>
		<label class="input">
			<span class="label">Email:</span>
			<input
				placeholder="example@domain.com"
				{...email.as('email')}
				onclick={() => (isFilling = true)}
			/>
		</label>
		{#each email.issues() as issue, index (index)}
			<p class="issue">{issue.message}</p>
		{/each}
		<label class="input">
			<span class="label">Password:</span>
			<input
				placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
				{...password.as('password')}
				onclick={() => (isFilling = true)}
			/>
		</label>
		{#each password.issues() as issue, index (index)}
			<p class="issue">{issue.message}</p>
		{/each}
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
