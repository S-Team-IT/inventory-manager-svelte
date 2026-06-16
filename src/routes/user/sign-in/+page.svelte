<script lang="ts">
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
		placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
	/>
	<button type="submit" class="btn">Sign in</button>
</Form>
