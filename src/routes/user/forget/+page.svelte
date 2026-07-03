<script lang="ts">
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import { resetPassword } from '$lib/remote/user.remote';

	const { email } = resetPassword.fields;
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<Form
	legend="Reset Password"
	remoteForm={resetPassword}
	errorMsg="RESET PASSWORD ERROR MESSAGE"
	successMsg="Password reset. Please check your email."
	onSuccess={() => {}}>
	<Input label="Email" type="email" field={email} placeholder="example@domain.com" />
	<button type="submit" class="btn btn-primary">Reset</button>
</Form>
