<script lang="ts">
	import type { RemoteQueryUpdate } from '@sveltejs/kit';

	type formEnhance = {
		form: HTMLFormElement;
		submit: () => Promise<boolean> & {
			updates: (...updates: RemoteQueryUpdate[]) => Promise<boolean>;
		};
	};

	let { remoteForm, legend, children, errorMsg, successMsg, isFilling, classes = '' } = $props();

	let isLoading = $state<boolean>(false);
</script>

<form
	enctype="multipart/form-data"
	class="w-full max-w-100 {classes}"
	{...remoteForm.enhance(async ({ form, submit }: formEnhance) => {
		isLoading = true;
		if (await submit()) {
			isFilling = false;
			if (remoteForm.result?.success !== false) form.reset();
		}

		isLoading = false;
	})}
>
	<fieldset
		class="fieldset gap-0 rounded-box border border-base-300 bg-base-200 p-4"
		disabled={isLoading}
	>
		<legend class="fieldset-legend text-xl">{legend}</legend>
		{@render children()}
		{#if isLoading}
			<p>Loading...</p>
		{/if}
		{#if remoteForm.result && !isFilling}
			{#if !remoteForm.result.success}
				<p class="issue">{errorMsg}</p>
			{:else}
				<p class="text-green-600">{successMsg}</p>
			{/if}
		{/if}
	</fieldset>
</form>
