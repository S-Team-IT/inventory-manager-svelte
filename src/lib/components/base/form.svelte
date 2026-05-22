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
		beforeSubmit = async () => Promise<void>,
		onSuccess = async () => Promise<void>,
		afterSubmit = async () => Promise<void>
	} = $props();

	let isLoading = $state<boolean>(false);

	async function enhanceCallback({ form, data, submit }: EnhanceParams) {
		//this should never happen but ts is funky like that
		if (!form || !data || !submit) return;

		isLoading = true;

		beforeSubmit(data);

		if (await submit()) {
			if (remoteForm.result.success) {
				onSuccess(data);
				form.reset();
				toast.success(successMsg);
			} else {
				toast.error(errorMsg);
			}
			afterSubmit(data);
		}
		isLoading = false;
	}
</script>

<form
	enctype="multipart/form-data"
	class="w-full max-w-100 {classes}"
	{...remoteForm.enhance(enhanceCallback)}
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
	</fieldset>
</form>
