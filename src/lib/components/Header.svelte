<script>
	import { user } from '$lib/stores/userStore';
	import { logout } from '$lib/utils';
	import LogoutIcon from './icons/LogoutIcon.svelte';
</script>

<nav class="container w-full mx-auto h-16 flex overflow-hidden">
	<div class="w-full flex">
		<h1 class="text-3xl leading-[4rem] align-middle mx-auto">Studrel Candidate Portal</h1>
	</div>
	<div class="relative">
		{#if $user}
			<button
				class="h-10 w-10 mt-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-900 absolute l-0 -translate-x-[calc(100%+1rem)]"
				on:click={logout}
				><LogoutIcon className="h-7 w-7 mx-auto dark:stroke-white" />
			</button>
		{/if}
	</div>
</nav>
