<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import { signIn } from '$lib/remote/auth.remote';
	const { email, password } = signIn.fields;

	let isFilling = $state<boolean>(true);
	const oninput = () => (isFilling = true);
</script>

<Form
	legend="Sign in"
	remoteForm={signIn}
	errorMsg="Invalid credentials"
	successMsg="Signed in"
	{isFilling}
>
	<Input label="Email" type="email" field={email} {oninput} placeholder="example@domain.com" />
	<Input
		label="Password"
		type="password"
		field={password}
		{oninput}
		placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
	/>
	<button type="submit" class="btn">Sign in</button>
</Form>
