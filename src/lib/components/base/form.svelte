<script lang="ts">
	import type { EnhanceParams } from '$lib/types/types';
	import { toast } from 'svelte-sonner';

	let {
		remoteForm,
		legend = '',
		children,
		errorMsg,
		successMsg,
		classes = '',
		//The following are callbacks to be called during various stages of form submission.
		//Note that the submitted FormData cannot be modified here.
		//Workarounds can be found on https://github.com/sveltejs/kit/issues/14477#issuecomment-3419974870.
		beforeSubmit = async () => Promise<void>,
		onSuccess = async () => Promise<void>,
		afterSubmit = async () => Promise<void>
	} = $props();

	let isLoading = $state<boolean>(false);

	//WARNING: Breaking changes happened to form enhance.
	//See:
	//https://svelte.dev/blog/whats-new-in-svelte-june-2026
	//https://github.com/sveltejs/kit/pull/15657
	async function enhanceCallback({ form, data, submit }: EnhanceParams) {
		// typescript gets angry
		if (!form || !data || !submit) throw new Error('form enhance callback null variables');
		isLoading = true;
		beforeSubmit(data);
		if (await submit()) {
			//Handle form redirection, since that can't return remoteForm.result
			if (!remoteForm.result) {
				form.reset();
				return;
			}
			const { success, msg } = remoteForm.result;
			if (success) {
				toast.success(successMsg);
				onSuccess(data);
				form.reset();
			} else {
				toast.error(msg || errorMsg);
			}
		}
		afterSubmit(data);
		isLoading = false;
	}
</script>

<form
	enctype="multipart/form-data"
	class="w-full max-w-100 {classes}"
	{...remoteForm.enhance(enhanceCallback)}>
	<fieldset
		class="fieldset gap-0 rounded-box border border-base-300 bg-base-200 p-4"
		disabled={isLoading}>
		<legend class="fieldset-legend text-xl">{legend}</legend>
		{@render children()}
		{#if isLoading}
			<p>Loading...</p>
		{/if}
	</fieldset>
</form>
