<script lang="ts">
	import { resolve } from '$app/paths';
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import { signIn } from '$lib/remote/auth.remote';

	const { email, password } = signIn.fields;
</script>

<svelte:head>
	<title>Sign In</title>
</svelte:head>

<Form legend="Sign in" remoteForm={signIn} errorMsg="Invalid credentials" successMsg="Signed in">
	<Input label="Email" type="email" field={email} placeholder="example@domain.com" />
	<Input
		label="Password"
		type="password"
		field={password}
		placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" />
	<button type="submit" class="btn">Sign in</button>
	<div class="-mt-2.5 mb-3 flex justify-end">
		<a class="link-secondary" href={resolve('/user/forget')}>Forget Password?</a>
	</div>
</Form>
