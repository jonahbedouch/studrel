<script>
	export let className = '';
</script>

<div
	class="flex flex-col w-full mx-auto my-3 p-6 rounded-xl bg-gray-200 dark:bg-gray-900 {className}"
>
	<slot />
</div>
