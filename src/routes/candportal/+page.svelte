<script lang="ts">
	import { goto } from '$app/navigation';
	import {
		userData,
		type CandidateDataStore,
		type CandidateData,
		type MemberData
	} from '$lib/authStore';
	import Card from '$lib/components/Card.svelte';
	import CompleteIcon from '$lib/components/CompleteIcon.svelte';
	import Event from '$lib/components/Event.svelte';
	import IncompleteIcon from '$lib/components/IncompleteIcon.svelte';
	import { firestore } from '$lib/firebase';
	import type { Event as EventType } from '$lib/utils';
	import {
		collection,
		getDoc,
		getDocs,
		limit,
		orderBy,
		query,
		startAt,
		where
	} from 'firebase/firestore';
	import { onMount } from 'svelte';
	let candidateData = userData as CandidateDataStore;

	let eventRef = collection(firestore, 'events');
	console.log(Date.now());
	let eventQuery = query(eventRef, orderBy('time'), where('time', '>', new Date()), limit(5));
	let studrelPoc: MemberData | undefined;
	let events: Array<EventType> = [];

	$: graphicsPoints = $candidateData ? $candidateData.graphicsCreated.length * 2 : 0;
	$: spotlightPoints = $candidateData ? ($candidateData.spotlightCreated ? 1 : 0) * 3 : 0;
	$: merchPoints = $candidateData ? ($candidateData.merchDesigned ? 1 : 0) * 4 : 0;

	$: graphicsCategoryPoints = graphicsPoints + spotlightPoints + merchPoints;
	$: graphicReqSatisfied = graphicsCategoryPoints > 0;

	$: meetingPoints = $candidateData ? $candidateData.meetingsAttended.length * 1 : 0;
	$: snackPoints = $candidateData ? $candidateData.snackAttacksAttended.length * 1 : 0;
	$: eventPoints = $candidateData ? $candidateData.eventsOrganized.length * 4 : 0;

	$: eventCategoryPoints = meetingPoints + snackPoints + eventPoints;
	$: eventReqSatisfied = eventCategoryPoints > 0;

	$: totalPoints = graphicsCategoryPoints + eventCategoryPoints;

	onMount(async () => {
		$candidateData = $candidateData as CandidateData;
		if (!$candidateData) {
			goto('/invalidAccount');
		}

		let pocLookup = await getDoc($candidateData.poc);
		let eventLookup = await getDocs(eventQuery);
		eventLookup.docs.map(async (doc) => {
			let eventData = await doc.data();
			events = [...events, eventData as EventType];
		});

		// once again, probably not a safe cast, you can read
		// the hand-wavey justification for it in utils.
		// @ts-ignore
		studrelPoc = await pocLookup.data();
	});
</script>

<div class="flex flex-col">
	<Card>
		<h1 class="text-3xl">Welcome to Studrel!</h1>
		<p class="text-lg">
			We're very excited to have you initiating with us this semester, {$candidateData?.firstName}!
			Studrel is the student relations arm of HKN! We focus on event planning for the campus
			community, marketing and social media promotions, and general community engagement. This
			semester, we're demoing a brand new candidate project, alongside this brand new candidate
			portal! If you have any problems with the portal or are confused about your responsibilities,
			please reach out to your POC!
		</p>
	</Card>

	<Card>
		<h1 class="text-3xl">
			Your POC this semester is:
			{#if studrelPoc}
				{studrelPoc.firstName} {studrelPoc.lastName}
			{:else}
				Loading...
			{/if}
		</h1>
		<p class="text-lg mb-4">
			They should check in with you throughout the semester! If you have any questions, feel free to
			reach out to them on slack!
		</p>
	</Card>
	<div class="flex md:flex-row flex-col">
		<Card className="flex grow mr-6 min-w-max">
			<h1 class="text-3xl">Upcoming Dates</h1>
			<ul class="text-lg max-h-64 overflow-y-scroll">
				{#if events.length > 0}
					{#each events as event}
						<Event {event} />
					{/each}
				{:else}
					<p>Loading...</p>
				{/if}
			</ul>
		</Card>
		<Card className="shrink min-w-max">
			<h1 class="text-3xl">Important Links</h1>
			<p class="text-lg">put event signups here</p>
		</Card>
	</div>

	<Card>
		<h1 class="flex flex-row items-center align-middle text-3xl">
			Candidate Project
			{#if totalPoints > 6 && graphicReqSatisfied && eventReqSatisfied}
				<CompleteIcon
					className="w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
				/>
			{:else}
				<IncompleteIcon
					className="w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
				/>
			{/if}
		</h1>
		<div class="flex">
			<div class="flex flex-col w-full">
				<h2 class="mb-1 flex flex-row items-center align-middle text-2xl">
					Number of Points
					{#if totalPoints >= 6}
						<CompleteIcon
							className="w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
						/>
					{:else}
						<IncompleteIcon
							className="w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
						/>
					{/if}
				</h2>
				<div class="w-full mb-5 h-8 rounded-full bg-gray-200 dark:bg-gray-700">
					<div
						class="h-8 rounded-full bg-blue-500"
						style="width: {(totalPoints / 6) * 100 < 100 ? (totalPoints / 6) * 100 : 100}%"
					/>
				</div>
			</div>
			<div class="flex justify-center align-middle items-center w-32">
				<span class="block text-5xl mx-auto">{totalPoints}/6</span>
			</div>
		</div>
		<h2 class="flex flex-row items-center align-middle text-2xl">
			Breadth Requirement
			{#if graphicReqSatisfied && eventReqSatisfied}
				<CompleteIcon
					className="w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
				/>
			{:else}
				<IncompleteIcon
					className="w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
				/>
			{/if}
		</h2>
		<p class="flex flex-row items-center align-middle text-lg">
			Graphic Design
			{#if graphicReqSatisfied}
				<CompleteIcon
					className="w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
				/>
			{:else}
				<IncompleteIcon
					className="w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
				/>
			{/if}
		</p>
		<p class="flex flex-row items-center align-middle text-lg">
			Event Planning
			{#if eventReqSatisfied}
				<CompleteIcon
					className="w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
				/>
			{:else}
				<IncompleteIcon
					className="w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
				/>
			{/if}
		</p>
	</Card>
	<div class="flex md:flex-row flex-col">
		<Card className="flex grow mr-6 min-w-max">
			<h1 class="text-3xl">Graphic Design</h1>
			<p class="text-2xl">
				Instagram Posts <span
					class="w-6 h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg">2 PTS</span
				>
				{#if $candidateData?.graphicsCreated && $candidateData?.graphicsCreated.length > 0}
					{#each $candidateData.graphicsCreated as graphic}
						<p class="text-base">{graphic}</p>
					{/each}
				{:else}
					<p class="text-base">No Posts Made (yet... )</p>
				{/if}
			</p>
			<p class="flex flex-row items-center align-middle text-2xl">
				Committee Spotlight Graphic <span
					class="h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg">3 PTS</span
				>
				{#if $candidateData?.spotlightCreated}
					<CompleteIcon
						className="w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
					/>
				{:else}
					<IncompleteIcon
						className="w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
					/>
				{/if}
			</p>
			<p class="flex flex-row items-center align-middle text-2xl">
				Merch Design <span class="h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg"
					>4 PTS</span
				>
				{#if $candidateData?.merchDesigned}
					<CompleteIcon
						className="w-6 h-6 ml-2 stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
					/>
				{:else}
					<IncompleteIcon
						className="w-6 h-6 ml-2 stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
					/>
				{/if}
			</p>
		</Card>
		<Card className="flex grow min-w-max">
			<h1 class="text-3xl">Event Planning</h1>
			<p class="text-2xl">
				Studrel Meetings <span
					class="w-6 h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg">1 PT</span
				>
				{#if $candidateData?.meetingsAttended && $candidateData?.meetingsAttended.length > 0}
					{#each $candidateData.meetingsAttended as meeting}
						<p class="text-base">{meeting}</p>
					{/each}
				{:else}
					<p class="text-base">No Studrel Meetings Attended (yet... )</p>
				{/if}
			</p>
			<p class="text-2xl">
				Snack Attacks <span
					class="w-6 h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg">1 PT</span
				>
				{#if $candidateData?.snackAttacksAttended && $candidateData?.snackAttacksAttended.length > 0}
					{#each $candidateData.snackAttacksAttended as meeting}
						<p class="text-base">{meeting}</p>
					{/each}
				{:else}
					<p class="text-base">No Snack Attacks Attended (yet... )</p>
				{/if}
			</p>
			<p class="text-2xl">
				Event Organizing <span
					class="w-6 h-6 ml-2 stroke-2 text-lg bg-blue-600 text-white px-1 rounded-lg">4 PTS</span
				>
				{#if $candidateData?.eventsOrganized && $candidateData?.eventsOrganized.length > 0}
					{#each $candidateData.eventsOrganized as meeting}
						<p class="text-base">{meeting}</p>
					{/each}
				{:else}
					<p class="text-base">No Events Organized (yet... )</p>
				{/if}
			</p>
		</Card>
	</div>
</div>
