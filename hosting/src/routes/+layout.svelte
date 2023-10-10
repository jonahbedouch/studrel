<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { user, userData } from '$lib/authStore';
	import { get } from 'svelte/store';
	import type { User } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { getUserData, isCandidateData } from '$lib/utils';

	onMount(async () => {
		await user.known;

		const userState: User | null = get(user);
		if (userState == null) {
			goto('/login');
		}

		const data = await getUserData($user);
		if (data == null || data == undefined) {
			goto('/invalidAccount');
			return;
		}

		userData.set(data);
		if (data.candidate) {
			if (isCandidateData(data)) {
				goto('/candportal');
			} else {
				goto('/invalidAccount');
			}
			return;
		}
		goto('/memberportal');
	});
</script>

<div id="app" class="w-full bg-white dark:bg-gray-950 dark:text-white">
	<Header />

	<main class="flex min-h-screen container mx-auto px-4 overflow-y-scroll">
		<slot />
	</main>
</div>
