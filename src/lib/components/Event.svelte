<script lang="ts">
	import {
		user,
		type CandidateData,
		userData,
		type UserData,
		type CandidateStore
	} from '$lib/stores/userStore';
	import { firestore } from '$lib/firebase';
	import type { Event } from '$lib/stores/eventStore';
	import { arrayRemove, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';

	export let event: Event;
	let eventRef = doc(firestore, 'events', event.name);
	let userRef = doc(firestore, 'users', $user?.email ?? '');
	let candidateData = userData as CandidateStore;

	const rsvp = async () => {
		if ($user && $user.email) {
			await updateDoc(eventRef, { rsvp: arrayUnion(userRef) });
			await updateDoc(userRef, { rsvps: arrayUnion(eventRef) });
		}
	};

	const unRsvp = async () => {
		if ($user && $user.email) {
			await updateDoc(eventRef, { rsvp: arrayRemove(userRef) });
			await updateDoc(userRef, { rsvps: arrayRemove(eventRef) });
		}
	};
</script>

{#if $userData?.candidate}
	<li class="flex flex-col">
		<h1>
			<b>{event.name}</b>
			{#if event.rsvp && $user?.email && $candidateData?.rsvps.includes(event.name)}
				<button
					class="text-base bg-red-600 hover:bg-red-700 px-1 rounded-lg text-white"
					on:click={unRsvp}>un-RSVP</button
				>
			{:else if event.rsvp}
				<button
					class="text-base bg-blue-600 hover:bg-blue-700 px-1 rounded-lg text-white"
					on:click={rsvp}>RSVP</button
				>
			{/if}
		</h1>
		<p class="text-lg">
			{event.location} | {event.time.toDate().toLocaleDateString()}
			{event.time.toDate().toLocaleTimeString()}
		</p>
	</li>
{:else}
	<li class="flex flex-col">
		<h1 class="text-xl">
			<b>{event.name}</b>
		</h1>
		<p class="text-lg">{event.location} | {event.time.toDate().toLocaleDateString()}</p>
	</li>
{/if}
