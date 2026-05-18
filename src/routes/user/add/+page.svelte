<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import { createUser } from '$lib/remote/user.remote';
	const { email, password, role, name } = createUser.fields;

	let isFilling = $state<boolean>(true);
	const oninput = () => (isFilling = true);
</script>

<Form
	legend="Create new user"
	remoteForm={createUser}
	errorMsg="Something went wrong, please try again."
	successMsg="User created."
	{isFilling}
>
	<input {...password.as('hidden', '12345678')} />
	<Input label="Email" type="email" field={email} {oninput} placeholder="example@domain.com" />
	<Input label="Name" type="text" field={name} {oninput} placeholder="John" />
	<label>
		<input class="radio" {...role.as('radio', 'QS')} required />
		QS
	</label>
	<label>
		<input class="radio" {...role.as('radio', 'Procurement')} />
		Procurement
	</label>
	<label>
		<input class="radio" {...role.as('radio', 'Project')} />
		Project
	</label>
	{#each role.issues() as issue, index (index)}
		<p class="issue">{issue.message}</p>
	{/each}
	<button type="submit" class="btn mt-1">Create</button>
</Form>
