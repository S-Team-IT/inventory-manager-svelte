<!-- <script lang="ts">
	import { editItem } from '$lib/remote/item.remote';
	import Form from './base/form.svelte';

	type Props = {
		masterNumber: string;
        name:string,

	};

	const { masterNumber, name }: Props = $props();

	function onclick() {
		const modal = document.querySelector(`#edit-modal${masterNumber}`);
		(modal as HTMLDialogElement).close();
	}
</script>

<dialog id={`edit-modal${masterNumber}`} class="modal">
	<Form remoteForm={editItem} legend={`Editting ${name}`}>
			<div class="modal-action">
				<button class="btn btn-soft btn-secondary" type="button" {onclick}>Cancel</button>
				<button class="btn btn-primary" type="submit">Confirm</button>
			</div>
		</div>
	</Form>
</dialog> -->
