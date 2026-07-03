<script lang="ts">
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import { editPassword } from '$lib/remote/user.remote';

	const { oldPassword, newPassword } = editPassword.fields;
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<Form
	remoteForm={editPassword}
	errorMsg="Failed to update password."
	successMsg="Password updated."
	legend="Change password">
	<Input label="Current password" type="password" field={oldPassword} placeholder="*******" />
	<Input label="New password" type="password" field={newPassword} placeholder="********" />
	<button class="btn btn-soft btn-primary">Edit</button>
</Form>
