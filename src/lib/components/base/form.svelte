<script lang="ts">
	import type { EnhanceParams } from '$lib/types/types';

	let {
		remoteForm,
		legend,
		children,
		errorMsg,
		successMsg,
		isFilling,
		classes = '',
		enhanceCallback = defaultEnhance
	} = $props();

	let isLoading = $state<boolean>(false);

	async function defaultEnhance({ form, submit }: EnhanceParams) {
		isLoading = true;
		if (await submit!()) {
			isFilling = false;
			if (remoteForm.result?.success !== false) form!.reset();
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
		{#if remoteForm.result && !isFilling}
			{#if !remoteForm.result.success}
				<p class="issue">{errorMsg}</p>
			{:else}
				<p class="text-green-600">{successMsg}</p>
			{/if}
		{/if}
	</fieldset>
</form>
