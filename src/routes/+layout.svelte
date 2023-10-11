<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { user, userData } from '$lib/authStore';
	import { get, writable } from 'svelte/store';
	import { page } from '$app/stores';
	import type { User } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { getUserData, isCandidateData } from '$lib/utils';
	import Card from '$lib/components/Card.svelte';

	const loaded = writable(false);

	onMount(async () => {
		await user.known;
		await userData.known();

		if ($user == null) {
			goto('/login');
			$loaded = true;
			return;
		}

		if ($userData == null || $userData == undefined) {
			goto('/invalidAccount');
			$loaded = true;
			return;
		}

		if ($userData.candidate) {
			console.log('maybe cand?');
			if (isCandidateData($userData)) {
				goto('/candportal');
			} else {
				if (!$page.url.pathname.startsWith('/memberportal')) {
					goto('/memberportal');
				}
				goto('/invalidAccount');
			}
			$loaded = true;
			return;
		}
		if (!$page.url.pathname.startsWith('/memberportal')) {
			goto('/memberportal');
		}
		$loaded = true;
	});
</script>

<div id="app" class="w-full bg-white dark:bg-gray-950 dark:text-white">
	<Header />

	<main class="flex min-h-screen container mx-auto px-4 overflow-y-scroll">
		{#if loaded}
			<slot />
		{:else}
			<div class="flex flex-col w-full">
				<Card className="h-min">
					<div class="animate-pulse">
						<div class="flex-1 space-y-6 py-1">
							<div class="h-4 bg-gray-700 rounded-xl" />
							<div class="space-y-3">
								<div class="grid grid-cols-3 gap-4">
									<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
									<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
								</div>
								<div class="h-4 bg-gray-700 rounded-xl" />
							</div>
						</div>
					</div>
				</Card>

				<Card className="h-min">
					<div class="animate-pulse">
						<div class="flex-1 space-y-6 py-1">
							<div class="h-4 bg-gray-700 rounded-xl" />
							<div class="space-y-3">
								<div class="h-4 bg-gray-700 rounded-xl" />
								<div class="grid grid-cols-3 gap-4">
									<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
									<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
								</div>
							</div>
						</div>
					</div>
				</Card>
				<div class="flex md:flex-row flex-col">
					<Card className="flex grow mr-6 min-w-max">
						<div class="animate-pulse">
							<div class="flex-1 space-y-6 py-1">
								<div class="h-4 bg-gray-700 rounded-xl" />
								<div class="space-y-3">
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="grid grid-cols-3 gap-4">
										<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
										<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
									</div>
									<div class="h-4 bg-gray-700 rounded-xl" />
								</div>
							</div>
						</div>
					</Card>
					<Card className="flex grow min-w-max">
						<div class="animate-pulse">
							<div class="flex-1 space-y-6 py-1">
								<div class="h-4 bg-gray-700 rounded-xl" />
								<div class="space-y-3">
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="grid grid-cols-3 gap-4">
										<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
										<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
									</div>
									<div class="h-4 bg-gray-700 rounded-xl" />
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		{/if}
	</main>
</div>
