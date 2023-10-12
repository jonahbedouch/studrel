<script>
	import { logout } from '$lib/utils';
	import { user } from '$lib/stores/userStore';
	import Card from '$lib/components/Card.svelte';
</script>

<Card className="h-min">
	<h1 class="text-3xl">There is no valid account associated with this email.</h1>
	<p class="text-xl mb-12">
		This may be the result of an incorrectly set up account or data corruption. Please ensure that
		you are signed in with your <code
			class="bg-gray-300 border border-black dark:bg-gray-950 dark:border-white dark:text-gray-200 py-0.5 px-1 rounded"
			>@berkeley.edu</code
		>
		email if you are a candidate and your
		<code
			class="bg-gray-300 border border-black dark:bg-gray-950 dark:border-white dark:text-gray-200 py-0.5 px-1 rounded"
			>@hkn.eecs.berkeley.edu</code
		> email if you are already initiated. If you believe this to be an error, please DM your POC in the
		candidate slack!
	</p>
	<p class="mb-8 text-xl">
		You are currently signed in with: <code
			class="bg-gray-300 border border-black dark:bg-gray-950 dark:border-white dark:text-gray-200 py-0.5 px-1 rounded"
			>{$user?.email}</code
		>
	</p>

	<button
		class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-2 rounded"
		on:click={logout}>Sign Out</button
	>
</Card>
