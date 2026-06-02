<script lang="ts">
	let { checked, text = 'Submitting...' } = $props();
</script>

<input type="checkbox" bind:checked class="modal-toggle" />
<div class="modal" role="dialog">
	<div class="modal-box">
		<h3 class="text-lg font-bold">{text}</h3>
	</div>
</div>
