<script lang="ts">
	import {
		user,
		type CandidateData,
		userData,
		type UserData,
		type CandidateDataStore
	} from '$lib/authStore';
	import { firestore } from '$lib/firebase';
	import { isCandidateData, type Event } from '$lib/utils';
	import { arrayRemove, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';

	export let event: Event;
	let eventRef = doc(firestore, 'events', event.name);
	let userRef = doc(firestore, 'users', $user?.email ?? '');
	let candidateData = userData as CandidateDataStore;

	const rsvp = async () => {
		if ($user && $user.email) {
			await updateDoc(eventRef, { rsvp: arrayUnion($user.email) });
			await updateDoc(userRef, { rsvps: arrayUnion(event.name) });
			userData.update((data) => {
				if (isCandidateData(data)) {
					data.rsvps.push(event.name);
				}
				return data;
			});
		}
	};

	const unRsvp = async () => {
		if ($user && $user.email) {
			await updateDoc(eventRef, { rsvp: arrayRemove($user.email) });
			await updateDoc(userRef, { rsvps: arrayRemove(event.name) });
			userData.update((data) => {
				if (isCandidateData(data)) {
					console.log(event.name);
					data.rsvps = data.rsvps.filter((a) => a !== event.name);
				}
				return data;
			});
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
