<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	export let open: boolean;
	export let close: MouseEventHandler<HTMLDivElement>;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="{open
		? 'opacity-60 h-screen'
		: 'opacity-0 h-0'} bg-black fixed z-10 top-0 left-0 w-screen transition-[opacity] duration-500"
	on:click|preventDefault={close}
/>

<div
	class="{open
		? 'max-h-screen'
		: 'max-h-0'} h-auto z-20 w-screen overflow-hidden fixed bottom-0 left-0 transition-[max-height,padding,color,background-color,border-color,text-decoration-color,fill,stroke]"
>
	<div class="container px-4 mx-auto">
		<div
			class="rounded-t-2xl flex flex-col p-6 bg-gray-200 dark:bg-gray-900"
			on:click|stopPropagation
		>
			<slot />
		</div>
	</div>
</div>
