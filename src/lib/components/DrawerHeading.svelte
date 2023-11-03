<script lang="ts">
	import IncompleteIcon from './icons/IncompleteIcon.svelte';

	export let close: () => void;
</script>

<button class="flex flex-row group" on:click={close} on:keypress={close}>
	<h1 class="text-3xl"><slot /></h1>
	<div
		class="ml-auto flex justify-center align-middle items-center w-9 h-9 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
	>
		<IncompleteIcon className="w-7 h-7" />
	</div>
</button>
