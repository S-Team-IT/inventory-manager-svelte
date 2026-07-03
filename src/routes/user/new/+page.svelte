<script lang="ts">
	import Form from '$lib/components/base/form.svelte';
	import Input from '$lib/components/base/input.svelte';
	import { createUser } from '$lib/remote/user.remote';

	const { email, role, name } = createUser.fields;
</script>

<svelte:head>
	<title>Add New User</title>
</svelte:head>

<Form
	legend="Create new user"
	remoteForm={createUser}
	errorMsg="Something went wrong, please try again."
	successMsg="User created.">
	<Input label="Email" type="email" field={email} placeholder="example@domain.com" />
	<Input label="Name" type="text" field={name} placeholder="John" />
	<div class="mb-4 flex flex-col space-y-2">
		<label>
			<input class="radio mr-1" {...role.as('radio', 'QS')} required />
			QS
		</label>
		<label>
			<input class="radio mr-1" {...role.as('radio', 'Procurement')} />
			Procurement
		</label>
		<label>
			<input class="radio mr-1" {...role.as('radio', 'Project')} />
			Project
		</label>
	</div>

	{#each role.issues() as issue, index (index)}
		<p class="issue">{issue.message}</p>
	{/each}
	<button type="submit" class="btn mt-1 btn-primary">Create</button>
</Form>
