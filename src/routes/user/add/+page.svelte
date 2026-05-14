<script lang="ts">
	let role = $state();
</script>

<form>
	<fieldset class="fieldset w-xs rounded-box border border-base-300 bg-base-200 p-4">
		<legend class="fieldset-legend">Add new user</legend>
		<label class="input mb-1">
			<span class="label">Email:</span>
			<input type="text" placeholder="example@domain.com" />
		</label>
		<label>
			<input type="radio" name="qs" class="radio" bind:group={role} value="QS" />
			QS
		</label>
		<label>
			<input type="radio" name="procurement" class="radio" bind:group={role} value="Procurement" />
			Procurement
		</label>
		<label>
			<input type="radio" name="project" class="radio" bind:group={role} value="Project" />
			Project
		</label>

		<button type="submit" class="btn mt-1">Create</button>
	</fieldset>
</form>
