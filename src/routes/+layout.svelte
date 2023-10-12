<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import { user, userData } from '$lib/stores/userStore';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { isCandidateData } from '$lib/utils';
	import Card from '$lib/components/Card.svelte';
	import { events } from '$lib/stores/eventStore';
	import { links } from '$lib/stores/linkStore';

	export const loaded = writable(false);

	onMount(async () => {
		await user.known();
		if ($user == null) {
			$loaded = true;
			goto('/login');
			return;
		}
		await userData.known();
		await events.known();
		await links.known();
		$loaded = true;

		if ($user == null) {
			goto('/login');
			return;
		}

		if ($userData == null || $userData == undefined) {
			goto('/invalidAccount');
			return;
		}

		if ($userData.candidate) {
			if (isCandidateData($userData)) {
				goto('/candportal');
			} else {
				if (!$page.url.pathname.startsWith('/memberportal')) {
					goto('/memberportal');
				}
				goto('/invalidAccount');
			}
			return;
		}
		if (!$page.url.pathname.startsWith('/memberportal')) {
			goto('/memberportal');
		}
	});
</script>

<div id="app" class="w-full bg-white dark:bg-gray-950 dark:text-white">
	<Header />

	{#if $loaded}
		<main class="flex min-h-[calc(100vh-4rem)] container mx-auto px-4 overflow-y-scroll">
			<slot />
		</main>
	{:else}
		<main class="flex min-h-[calc(100vh-4rem)] container mx-auto px-4 overflow-y-hidden">
			<div class="flex flex-col w-full h-[calc(100vh-4rem)] overflow-hidden">
				<Card className="h-min">
					<div class="animate-pulse">
						<div class="flex-1 space-y-6 py-1">
							<div class="h-6 bg-gray-700 rounded-xl" />
							<div class="space-y-3">
								<div class="grid grid-cols-3 gap-4">
									<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
									<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
								</div>
								<div class="h-4 bg-gray-700 rounded-xl" />
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
				<Card className="h-min">
					<div class="animate-pulse">
						<div class="flex-1 space-y-6 py-1">
							<div class="h-6 bg-gray-700 rounded-xl" />
							<div class="space-y-3">
								<div class="h-4 bg-gray-700 rounded-xl" />
								<div class="h-4 bg-gray-700 rounded-xl" />
							</div>
						</div>
					</div>
				</Card>
				<div class="flex md:flex-row flex-col">
					<Card className="flex grow mr-6 min-w-max">
						<div class="animate-pulse">
							<div class="flex-1 space-y-6 py-1">
								<div class="h-6 bg-gray-700 rounded-xl" />
								<div class="space-y-3">
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="grid grid-cols-3 gap-4">
										<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
										<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
									</div>
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="h-4 bg-gray-700 rounded-xl" />
								</div>
							</div>
						</div>
					</Card>
					<Card className="flex grow min-w-max">
						<div class="animate-pulse">
							<div class="flex-1 space-y-6 py-1">
								<div class="h-6 bg-gray-700 rounded-xl" />
								<div class="space-y-3">
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="grid grid-cols-3 gap-4">
										<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
										<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
									</div>
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="h-4 bg-gray-700 rounded-xl" />
								</div>
							</div>
						</div>
					</Card>
				</div>
				<Card className="h-min">
					<div class="animate-pulse">
						<div class="flex-1 space-y-6 py-1">
							<div class="h-6 bg-gray-700 rounded-xl" />
							<div class="space-y-3">
								<div class="grid grid-cols-12 gap-4">
									<div class="h-8 bg-gray-700 rounded-xl col-span-11" />
									<div class="h-8 bg-gray-700 rounded-xl col-span-1" />
								</div>
							</div>
							<div class="space-y-3">
								<div class="grid grid-cols-3 gap-4">
									<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
									<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
								</div>
								<div class="h-4 bg-gray-700 rounded-xl" />
								<div class="h-4 bg-gray-700 rounded-xl" />
							</div>
						</div>
					</div>
				</Card>
				<div class="flex md:flex-row flex-col">
					<Card className="flex grow mr-6 min-w-max">
						<div class="animate-pulse">
							<div class="flex-1 space-y-6 py-1">
								<div class="h-6 bg-gray-700 rounded-xl" />
								<div class="space-y-3">
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="grid grid-cols-3 gap-4">
										<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
										<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
									</div>
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="h-4 bg-gray-700 rounded-xl" />
								</div>
							</div>
						</div>
					</Card>
					<Card className="flex grow min-w-max">
						<div class="animate-pulse">
							<div class="flex-1 space-y-6 py-1">
								<div class="h-6 bg-gray-700 rounded-xl" />
								<div class="space-y-3">
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="grid grid-cols-3 gap-4">
										<div class="h-4 bg-gray-700 rounded-xl col-span-2" />
										<div class="h-4 bg-gray-700 rounded-xl col-span-1" />
									</div>
									<div class="h-4 bg-gray-700 rounded-xl" />
									<div class="h-4 bg-gray-700 rounded-xl" />
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</main>
	{/if}
</div>
