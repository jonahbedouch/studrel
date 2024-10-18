<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { Event } from '$lib/stores/eventStore';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import CompleteIcon from '$lib/components/icons/CompleteIcon.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import IncompleteIcon from '$lib/components/icons/IncompleteIcon.svelte';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
	import { firestore } from '$lib/firebase';
	import { events } from '$lib/stores/eventStore';
	import { memberStore } from '$lib/stores/memberStore';
	import { user, type CandidateData, userData } from '$lib/stores/userStore';
	import {
		getBreadthReq,
		getPoints,
		getProjectComplete,
		includesRef,
		isCandidateData,
		isEvent,
		isMemberData,
		isUserData
	} from '$lib/utils';
	import {
		DocumentReference,
		Timestamp,
		WriteBatch,
		arrayRemove,
		arrayUnion,
		deleteDoc,
		deleteField,
		doc,
		setDoc,
		updateDoc,
		writeBatch
	} from 'firebase/firestore';
	import { writable, type Writable } from 'svelte/store';
	import Drawer from '$lib/components/Drawer.svelte';
	import DrawerHeading from '$lib/components/DrawerHeading.svelte';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	// Page Control
	const newCandShown = writable(false);
	const newOfficerShown = writable(false);
	const newEventShown = writable(false);
	const candListShown: Writable<'assigned' | 'all' | null> = writable('assigned');
	const eventListShown: Writable<'upcoming' | 'all' | null> = writable('upcoming');

	const drawerVisible: Writable<boolean> = writable(false);
	const drawerMode: Writable<'delete' | 'edit' | 'update' | null> = writable();
	const target: Writable<Event | CandidateData | null> = writable();

	const toggleNewCand = () => {
		newCandShown.update((t) => !t);
	};

	const toggleNewOfficer = () => {
		newOfficerShown.update((t) => !t);
	};

	const toggleAssignedCandList = () => {
		if ($candListShown == 'assigned') {
			$candListShown = null;
		} else {
			$candListShown = 'assigned';
		}
	};

	const toggleAllCandList = () => {
		if ($candListShown == 'all') {
			$candListShown = null;
		} else {
			$candListShown = 'all';
		}
	};

	const toggleUpcomingEventList = () => {
		if ($eventListShown == 'upcoming') {
			$eventListShown = null;
		} else {
			$eventListShown = 'upcoming';
		}
	};

	const toggleAllEventList = () => {
		if ($eventListShown == 'all') {
			$eventListShown = null;
		} else {
			$eventListShown = 'all';
		}
	};

	const toggleNewEvent = () => {
		newEventShown.update((t) => !t);
	};

	// New Candidate Form
	const newCandFName = writable('');
	const newCandLName = writable('');
	const newCandEmail = writable('');
	const newCandPoc = writable('');

	$: newCandValdiation = !(
		$newCandFName != '' &&
		$newCandLName != '' &&
		$newCandEmail != '' &&
		!$memberStore?.candidateEmails?.includes($newCandEmail) &&
		$newCandPoc != ''
	);

	const resetNewCandForm = () => {
		newCandFName.set('');
		newCandLName.set('');
		newCandEmail.set('');
		newCandPoc.set('');
	};

	const newCandSubmit = async () => {
		if (newCandValdiation) {
			return;
		}

		const newCand = {
			candidate: true,
			firstName: $newCandFName,
			lastName: $newCandLName,
			email: $newCandEmail,
			poc: doc(firestore, 'users', $newCandPoc),
			snackAttacksAttended: [],
			eventsOrganized: [],
			graphicsCreated: [],
			meetingsAttended: [],
			socialsAttended: [],
			rsvps: [],
			spotlightCreated: false
		};

		await setDoc(doc(firestore, 'users', newCand.email), newCand);
		await updateDoc(newCand.poc, {
			candidates: arrayUnion(doc(firestore, 'users', newCand.email))
		});

		resetNewCandForm();
	};

	// Edit Candidate Form
	const editCandFName = writable('');
	const editCandLName = writable('');
	const editCandEmail = writable('');
	const editCandPoc = writable('');

	$: editCandValdiation = !($editCandFName != '' && $editCandLName != '' && $editCandPoc != '');

	// New Officer Form
	const newOfficerFName = writable('');
	const newOfficerLName = writable('');
	const newOfficerEmail = writable('');

	$: newOfficerValdiation = !(
		$newOfficerFName != '' &&
		$newOfficerLName != '' &&
		$newOfficerEmail != '' &&
		!$memberStore?.memberEmails?.includes($newOfficerEmail)
	);

	const resetNewOfficerForm = () => {
		newOfficerFName.set('');
		newOfficerLName.set('');
		newOfficerEmail.set('');
	};

	const newOfficerSubmit = async () => {
		if (newOfficerValdiation) {
			return;
		}

		const newOfficer = {
			candidate: false,
			firstName: $newOfficerFName,
			lastName: $newOfficerLName,
			email: $newOfficerEmail,
			candidates: []
		};

		await setDoc(doc(firestore, 'users', newOfficer.email), newOfficer);

		resetNewOfficerForm();
	};

	// New Event Form
	const newEventName = writable('');
	const newEventLocation = writable('');
	const newEventTime: Writable<string | undefined> = writable();
	const newEventCategory: Writable<'snackAttack' | 'studMeeting' | 'studSocial' | 'noRSVP' | ''> =
		writable('');

	$: newEventValidation = !(
		$newEventName != '' &&
		$newEventLocation != '' &&
		$newEventTime != undefined &&
		$newEventCategory != ''
	);

	const resetNewEventForm = () => {
		newEventName.set('');
		newEventLocation.set('');
		newEventTime.set(undefined);
		newEventCategory.set('');
	};

	const newEventSubmit = async () => {
		if (newEventValidation) {
			return;
		}

		let time = new Date($newEventTime!).valueOf();

		let time_s = Math.floor(time / 1000);
		let time_n = (time % 1000) * 1000000;

		const newEvent: Event = {
			name: $newEventName,
			location: $newEventLocation,
			time: new Timestamp(time_s, time_n),
			type: $newEventCategory
		};

		if ($newEventCategory != 'noRSVP') {
			newEvent.rsvp = [];
			newEvent.completed = [];
		}

		try {
			await setDoc(doc(firestore, 'events', newEvent.name), newEvent);

			resetNewEventForm();
		} catch (error) {
			alert(error);
		}
	};

	// Edit Event Form
	const editEventName = writable('');
	const editEventLocation = writable('');
	const editEventTime: Writable<string | undefined> = writable();
	const editEventCategory: Writable<'snackAttack' | 'studMeeting' | 'studSocial' | 'noRSVP' | ''> =
		writable('');

	$: editEventValidation = !(
		$editEventName != '' &&
		$editEventLocation != '' &&
		$editEventTime != undefined &&
		$editEventCategory != ''
	);

	// Update Event Form
	const completeTask = async (candidate: CandidateData) => {
		if (!isEvent($target)) {
			console.log($target);
			return;
		}

		const batch = writeBatch(firestore);
		const type = convertType($target.type);
		batch.update(doc(firestore, 'events', $target.name), {
			rsvp: arrayRemove(doc(firestore, 'users', candidate.email)),
			completed: arrayUnion(doc(firestore, 'users', candidate.email))
		});
		batch.update(doc(firestore, 'users', candidate.email), {
			rsvps: arrayRemove(doc(firestore, 'events', $target.name)),
			[type]: arrayUnion(doc(firestore, 'events', $target.name))
		});
		await batch.commit();
	};

	const uncompleteTask = async (candidate: CandidateData) => {
		if (!isEvent($target)) {
			console.log($target);
			return;
		}

		const batch = writeBatch(firestore);
		const type = convertType($target.type);
		batch.update(doc(firestore, 'events', $target.name), {
			rsvp: arrayUnion(doc(firestore, 'users', candidate.email)),
			completed: arrayRemove(doc(firestore, 'fieldusers', candidate.email))
		});
		batch.update(doc(firestore, 'users', candidate.email), {
			rsvps: arrayUnion(doc(firestore, 'events', $target.name)),
			[type]: arrayRemove(doc(firestore, 'events', $target.name))
		});
		await batch.commit();
	};

	// Update Candidate Form
	const addGraphicField = writable('');
	const addMeetingField = writable('');
	const addSocialField = writable('');
	const addSnackAttackField = writable('');
	const addEventField = writable('');

	const toggleSpotlight = async () => {
		if (!isCandidateData($target)) {
			return;
		}

		await updateDoc(doc(firestore, 'users', $target.email), {
			spotlightCreated: !$target.spotlightCreated
		});
		$target.spotlightCreated = !$target.spotlightCreated;
	};

	const addStringField = async (type: 'graphicsCreated' | 'eventsOrganized') => {
		if (!isCandidateData($target)) {
			return;
		}

		const field = type == 'graphicsCreated' ? $addGraphicField : $addEventField;

		await updateDoc(doc(firestore, 'users', $target.email), {
			[type]: arrayUnion(field)
		});
		$target[type] = [...$target[type], field];
		if (type == 'graphicsCreated') {
			$addGraphicField = '';
		} else {
			$addEventField = '';
		}
	};

	const removeStringField = async (
		type: 'graphicsCreated' | 'eventsOrganized',
		instance: String
	) => {
		if (!isCandidateData($target)) {
			return;
		}

		await updateDoc(doc(firestore, 'users', $target.email), {
			[type]: arrayRemove(instance)
		});
		$target[type] = $target[type].filter((x) => x != instance);
	};

	const addEvent = async (
		type: 'meetingsAttended' | 'snackAttacksAttended' | 'socialsAttended'
	) => {
		if (!isCandidateData($target)) {
			return;
		}

		const batch = writeBatch(firestore);
		const meetingRef = doc(
			firestore,
			'events',
			type == 'meetingsAttended'
				? $addMeetingField
				: type == 'socialsAttended'
				? $addSocialField
				: $addSnackAttackField
		);
		const userRef = doc(firestore, 'users', $target.email);

		batch.update(meetingRef, {
			rsvp: arrayRemove(userRef),
			completed: arrayUnion(userRef)
		});
		batch.update(userRef, {
			rsvps: arrayRemove(meetingRef),
			[type]: arrayUnion(meetingRef)
		});

		await batch.commit();
		$target[type] = [...$target[type], meetingRef];
		if (type == 'meetingsAttended') {
			$addMeetingField = '';
		} else if (type == 'socialsAttended') {
			$addSocialField = '';
		} else {
			$addSnackAttackField = '';
		}
	};

	const removeEvent = async (
		type: 'meetingsAttended' | 'snackAttacksAttended' | 'socialsAttended',
		event: DocumentReference
	) => {
		if (!isCandidateData($target)) {
			return;
		}

		const batch = writeBatch(firestore);
		const userRef = doc(firestore, 'users', $target.email);

		batch.update(event, {
			completed: arrayRemove(userRef)
		});
		batch.update(userRef, {
			[type]: arrayRemove(event)
		});

		await batch.commit();
		$target[type] = $target[type].filter((x) => x.path != event.path);
	};

	// Silly Modal Buttons
	const editCandBtn = async () => {
		if (editCandValdiation || !isCandidateData($target)) {
			return;
		}

		const candUpdates: Partial<CandidateData> = {
			firstName: $editCandFName,
			lastName: $editCandLName,
			poc: doc(firestore, 'users', $editCandPoc)
		};

		if (candUpdates.poc != undefined && candUpdates.poc != $target.poc) {
			const batch = writeBatch(firestore);
			batch.update($target.poc, {
				candidates: arrayRemove(doc(firestore, 'users', $target.email))
			});
			batch.update(doc(firestore, 'users', $editCandEmail), candUpdates);
			batch.update(candUpdates.poc, {
				candidates: arrayUnion(doc(firestore, 'users', $target.email))
			});

			await batch.commit();
		} else {
			await updateDoc(doc(firestore, 'users', $editCandEmail), candUpdates);
		}

		closeDrawer();
	};

	const delCandBtn = async () => {
		if (!isCandidateData($target)) {
			return;
		}

		const batch = writeBatch(firestore);
		const userRef = doc(firestore, 'users', $target.email);

		batch.update($target.poc, {
			candidates: arrayRemove(userRef)
		});
		$target.meetingsAttended.forEach((event) => {
			batch.update(event, {
				rsvp: arrayRemove(userRef),
				completed: arrayRemove(userRef)
			});
		});
		$target.socialsAttended.forEach((event) => {
			batch.update(event, {
				rsvp: arrayRemove(userRef),
				completed: arrayRemove(userRef)
			});
		});
		$target.snackAttacksAttended.forEach((event) => {
			batch.update(event, {
				rsvp: arrayRemove(userRef),
				completed: arrayRemove(userRef)
			});
		});
		$target.rsvps.forEach((event) => {
			batch.update(event, {
				rsvp: arrayRemove(userRef),
				completed: arrayRemove(userRef)
			});
		});
		batch.delete(userRef);

		await batch.commit();
		closeDrawer();
	};

	const editEventBtn = async () => {
		if (editEventValidation || !isEvent($target)) {
			return;
		}

		const batch = writeBatch(firestore);
		const time = new Date($editEventTime!).valueOf();
		const time_s = Math.floor(time / 1000);
		const time_n = (time % 1000) * 1000000;

		const newEvent: { [x: string]: any } = {
			name: $editEventName,
			location: $editEventLocation,
			time: new Timestamp(time_s, time_n),
			type: $editEventCategory
		};

		if ($target.type != 'noRSVP' && $editEventCategory == 'noRSVP') {
			newEvent.rsvp = deleteField();
			newEvent.completed = deleteField();

			batchDeleteEvent(batch);
		}

		if ($target.type != $editEventCategory) {
			batchUpdateEvent(batch);
		}

		if ($target.type == 'noRSVP' && $editEventCategory != 'noRSVP') {
			newEvent.rsvp = [];
			newEvent.completed = [];
		}

		batch.update(doc(firestore, 'events', newEvent.name), newEvent);

		try {
			await batch.commit();
		} catch (error) {
			alert(error);
		}

		closeDrawer();
	};

	const delEventBtn = async () => {
		if (!isEvent($target)) {
			return;
		}
		const batch = writeBatch(firestore);
		batchDeleteEvent(batch);

		batch.delete(doc(firestore, 'events', $target.name));

		await batch.commit();
		closeDrawer();
	};

	const batchDeleteEvent = (batch: WriteBatch): void => {
		if (isEvent($target)) {
			const type = convertType($target.type);

			if (type == 'noRSVP') {
				return;
			}

			$target.completed?.forEach((document) => {
				batch.update(document, {
					[type]: arrayRemove(doc(firestore, 'events', ($target as Event).name))
				});
			});

			$target.rsvp?.forEach((document) => {
				batch.update(document, {
					rsvps: arrayRemove(doc(firestore, 'events', ($target as Event).name))
				});
			});
		}
	};

	const batchUpdateEvent = (batch: WriteBatch): void => {
		if (isEvent($target)) {
			const oldType = convertType($target.type);
			const newType = convertType($editEventCategory);

			if (oldType == 'noRSVP') {
				return;
			}

			$target.completed?.forEach((document) => {
				batch.update(document, {
					[oldType]: arrayRemove(doc(firestore, 'events', ($target as Event).name)),
					[newType]: arrayUnion(doc(firestore, 'events', ($target as Event).name))
				});
			});
		}
	};

	// Event List
	const formatCategory = (category: string): string => {
		if (category == 'studMeeting') {
			return 'Studrel Meeting';
		} else if (category == 'studSocial') {
			return 'Studrel Social';
		} else if (category == 'snackAttack') {
			return 'Snack Attack';
		} else if (category == 'noRSVP') {
			return 'No RSVP';
		} else {
			return category;
		}
	};

	const closeDrawer = () => {
		$drawerVisible = false;
	};

	const isType = (x: string): x is 'snackAttack' | 'studMeeting' | 'studSocial' | 'noRSVP' => {
		return x == 'snackAttack' || x == 'studMeeting' || x == 'studSocial' || x == 'noRSVP';
	};

	const openDrawer = (type: 'delete' | 'edit' | 'update', target: Event | CandidateData) => {
		$drawerMode = type;
		$target = target;

		if (type == 'edit' && isCandidateData($target)) {
			$editCandFName = $target.firstName;
			$editCandLName = $target.lastName;
			$editCandEmail = $target.email;
			$editCandPoc = $target.poc.id;
		}

		if (type == 'update' && isCandidateData($target)) {
			$addGraphicField = '';
			$addMeetingField = '';
			$addSocialField = '';
			$addSnackAttackField = '';
			$addEventField = '';
		}

		if (type == 'edit' && isEvent($target)) {
			$editEventName = $target.name;
			$editEventLocation = $target.location;
			$editEventTime = $target.time.toDate().toISOString();
			$editEventCategory = isType($target.type) ? $target.type : '';
		}

		$drawerVisible = true;
	};

	const convertType = (type: string) => {
		return type == 'snackAttack'
			? 'snackAttacksAttended'
			: type == 'studMeeting'
			? 'meetingsAttended'
			: type == 'studSocial'
			? 'socialsAttended'
			: 'noRSVP';
	};
</script>

<svelte:head>
	<link rel="icon" href="/member.png" />
	<title>Member View | Studrel Candidate Portal</title>
</svelte:head>

<Drawer open={$drawerVisible} close={closeDrawer}>
	<DrawerHeading close={closeDrawer}>
		{#if isEvent($target) && $drawerMode != null}
			{#if $drawerMode == 'update'}
				Attendance Sheet for {$target.name}
			{:else}
				{$drawerMode.charAt(0).toUpperCase() + $drawerMode.slice(1)} {$target.name}
			{/if}
		{:else if isCandidateData($target) && $drawerMode != null}
			{#if $drawerMode == 'update'}
				{$target.firstName} {$target.lastName}'s Points
			{:else}
				{$drawerMode.charAt(0).toUpperCase() + $drawerMode.slice(1)}
				{$target.firstName}
				{$target.lastName}
			{/if}
		{/if}
	</DrawerHeading>

	{#if isEvent($target) && $drawerMode != null}
		{#if $drawerMode == 'update'}
			{#if $target.rsvp?.length == 0 && $target.completed?.length == 0}
				<p>No Students RSVP'd for this event</p>
			{:else}
				<div class="grid grid-cols-6 gap-2 w-full text-lg items-center justify-center">
					<h2 class="text-xl font-bold md:col-span-4 col-span-3">Name</h2>
					<h2 class="text-xl font-bold text-center md:col-span-1 col-span-2">Completed</h2>
					<div />
					{#each $memberStore?.candidates ?? [] as candidate}
						{#if includesRef($target.rsvp, doc(firestore, 'users', candidate.email)) || includesRef($target.completed, doc(firestore, 'users', candidate.email))}
							<span class="text-lg md:col-span-4 col-span-3"
								>{candidate.firstName} {candidate.lastName}</span
							>
							{#if includesRef(candidate.rsvps, doc(firestore, 'events', $target.name))}
								<button
									class="mx-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-800 md:col-span-1 col-span-2"
									on:click={() => completeTask(candidate)}
								>
									<IncompleteIcon className="mx-auto" />
								</button>
							{:else}
								<button
									class="mx-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg text-white bg-green-600 hover:bg-green-700 active:bg-green-800 md:col-span-1 col-span-2"
									on:click={() => uncompleteTask(candidate)}
								>
									<CompleteIcon className="mx-auto" />
								</button>
							{/if}
							<button
								class="ml-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
							>
								<IncompleteIcon className="mx-auto" />
							</button>
						{/if}
					{/each}
				</div>
			{/if}
		{:else if $drawerMode == 'edit'}
			<form class="" on:submit|preventDefault={editEventBtn}>
				<div class="grid gap-2 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full mt-4 px-0.5">
					<div class="flex flex-col w-full">
						<label for="e-event-name" class="text-lg">Name</label>
						<input
							class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg text-gray-800 dark:text-gray-400"
							id="e-event-name"
							type="text"
							disabled
							bind:value={$editEventName}
						/>
					</div>
					<div class="flex flex-col w-full">
						<label for="e-event-loc" class="text-lg">Location</label>
						<input
							class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
							id="e-event-loc"
							type="text"
							bind:value={$editEventLocation}
						/>
					</div>
					<div class="flex flex-col w-full">
						<label for="e-event-time" class="text-lg">Time</label>
						<input
							class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
							id="e-event-time"
							type="datetime-local"
							bind:value={$editEventTime}
						/>
					</div>
					<div class="flex flex-col w-full">
						<label for="e-event-cat" class="text-lg">Category</label>
						<select
							class="bg-white dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
							id="e-event-cat"
							bind:value={$editEventCategory}
						>
							<option value="" disabled selected>Select a Category</option>
							<option value="snackAttack">Snack Attack</option>
							<option value="studMeeting">Studrel Meeting</option>
							<option value="studSocial">Studrel Social</option>
							<option value="noRSVP">No RSVP</option>
						</select>
					</div>
				</div>
				<div class="grid gap-2 grid-cols-4 w-full mt-4">
					<button
						class="text-white text-lg bg-red-600 hover:bg-red-700 active:bg-red-800 w-full py-2 rounded-lg lg:col-span-1 col-span-2"
						on:click={closeDrawer}
					>
						Clear
					</button>
					<button
						class="text-white text-lg bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-500 hover:bg-green-700 active:bg-green-800 w-full py-2 rounded-lg lg:col-span-3 col-span-2"
						disabled={editEventValidation}
						type="submit"
					>
						Confirm
					</button>
				</div>
			</form>
		{:else}
			<p>
				Are you sure you want to delete {$target.name}? This will remove all points from candidates
				who attended. This cannot be undone.
			</p>
			<div class="grid gap-2 grid-cols-2 w-full mt-4">
				<button
					class="text-white text-lg bg-gray-400 hover:bg-gray-500 active:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-700 w-full py-2 rounded-lg col-span-1"
					on:click={closeDrawer}
				>
					Cancel
				</button>
				<button
					class="text-white text-lg bg-red-600 hover:bg-red-700 active:bg-red-800 w-full py-2 rounded-lg col-span-1"
					on:click={delEventBtn}
				>
					Confirm
				</button>
			</div>
		{/if}
	{:else if isCandidateData($target) && $drawerMode != null}
		{#if $drawerMode == 'update'}
			<div class="grid lg:grid-cols-3 grid-cols-1 gap-4">
				<div class="flex flex-col">
					<h2 class="text-xl font-bold sm:col-span-2 col-span-3">Graphic Design</h2>
					<div class="flex">
						<span class="text-lg">Committee Spotlight Created</span>
						{#if $target.spotlightCreated}
							<button
								class="ml-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg text-white bg-green-600 hover:bg-green-700 active:bg-green-800 md:col-span-1 col-span-2"
								on:click={toggleSpotlight}
							>
								<CompleteIcon className="mx-auto" />
							</button>
						{:else}
							<button
								class="ml-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg text-white bg-red-600 hover:bg-red-700 active:bg-red-800 md:col-span-1 col-span-2"
								on:click={toggleSpotlight}
							>
								<IncompleteIcon className="mx-auto" />
							</button>
						{/if}
					</div>
					<div class="flex flex-col">
						<h3 class="font-bold text-lg">Instagram Posts</h3>
						{#each $target.graphicsCreated as graphic}
							<button
								class="flex group w-full mb-2"
								on:click={() => removeStringField('graphicsCreated', graphic)}
							>
								<span class="text-lg">{graphic}</span>
								<div
									class="ml-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-800"
								>
									<IncompleteIcon className="mx-auto" />
								</div>
							</button>
						{:else}
							<span class="mb-2 text-gray-800 dark:text-gray-200">No Graphics Created</span>
						{/each}
						<div class="flex">
							<input
								class="dark:bg-gray-950 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg w-full"
								type="text"
								placeholder="Add a post"
								bind:value={$addGraphicField}
							/>
							<button
								class="text-lg p-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white disabled:bg-gray-400 dark:disabled:bg-gray-500 rounded-r-lg"
								disabled={$addGraphicField == ''}
								on:click={() => addStringField('graphicsCreated')}
								><PlusIcon />
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<h2 class="text-xl font-bold sm:col-span-2 col-span-3">Event Planning</h2>
					<div class="">
						<h3 class="font-bold text-lg">Snack Attacks Attended</h3>
						{#each $target.snackAttacksAttended as event}
							<button
								class="flex group w-full mb-2"
								on:click={() => removeEvent('snackAttacksAttended', event)}
							>
								<span class="text-lg">{event.id}</span>
								<div
									class="ml-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-800"
								>
									<IncompleteIcon className="mx-auto" />
								</div>
							</button>
						{:else}
							<span class="mb-2 text-gray-800 dark:text-gray-200">No Snack Attacks Attended</span>
						{/each}
						<div class="flex w-full">
							<select
								class="bg-white dark:bg-gray-950 rounded-l-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
								bind:value={$addSnackAttackField}
							>
								<option value="" disabled selected>Add a Snack Attack</option>
								{#each $events?.all ?? [] as event}
									{#if event.type == 'snackAttack' && !event.completed?.includes(doc(firestore, 'users', $target.email))}
										<option value={event.name}>{event.name}</option>
									{/if}
								{/each}
							</select>
							<button
								class="text-lg p-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white disabled:bg-gray-400 dark:disabled:bg-gray-500 rounded-r-lg"
								disabled={$addSnackAttackField == ''}
								on:click={() => addEvent('snackAttacksAttended')}><PlusIcon /></button
							>
						</div>
					</div>
					<div class="">
						<h3 class="font-bold text-lg">Events Organized</h3>
						{#each $target.eventsOrganized as event}
							<button
								class="flex group w-full mb-2"
								on:click={() => removeStringField('eventsOrganized', event)}
							>
								<span class="text-lg">{event}</span>
								<div
									class="ml-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-800"
								>
									<IncompleteIcon className="mx-auto" />
								</div>
							</button>
						{:else}
							<span class="mb-2 text-gray-800 dark:text-gray-200">No Events Organized</span>
						{/each}
						<div class="flex">
							<input
								class="dark:bg-gray-950 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg w-full"
								type="text"
								placeholder="Add a post"
								bind:value={$addEventField}
							/>
							<button
								class="text-lg p-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white disabled:bg-gray-400 dark:disabled:bg-gray-500 rounded-r-lg"
								disabled={$addEventField == ''}
								on:click={() => addStringField('eventsOrganized')}><PlusIcon /></button
							>
						</div>
					</div>
				</div>
				<div class="flex flex-col">
					<h2 class="text-xl font-bold sm:col-span-2 col-span-3">Committee Engagement</h2>
					<div class="">
						<h3 class="font-bold text-lg">Studrel Meetings Attended</h3>
						{#each $target.meetingsAttended as event}
							<button
								class="flex group w-full mb-2"
								on:click={() => removeEvent('meetingsAttended', event)}
							>
								<span class="text-lg">{event.id}</span>
								<div
									class="ml-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-800"
								>
									<IncompleteIcon className="mx-auto" />
								</div>
							</button>
						{:else}
							<span class="mb-2 text-gray-800 dark:text-gray-200">No Meetings Attended</span>
						{/each}
						<div class="flex w-full">
							<select
								class="bg-white dark:bg-gray-950 rounded-l-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
								bind:value={$addMeetingField}
							>
								<option value="" disabled selected>Add a Meeting</option>
								{#each $events?.all ?? [] as event}
									{#if event.type == 'studMeeting' && !event.completed?.includes(doc(firestore, 'users', $target.email))}
										<option value={event.name}>{event.name}</option>
									{/if}
								{/each}
							</select>
							<button
								class="text-lg p-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white disabled:bg-gray-400 dark:disabled:bg-gray-500 rounded-r-lg"
								disabled={$addMeetingField == ''}
								on:click={() => {
									addEvent('meetingsAttended');
								}}><PlusIcon /></button
							>
						</div>
					</div>
					<div class="">
						<h3 class="font-bold text-lg">Studrel Socials Attended</h3>
						{#each $target.socialsAttended as event}
							<button
								class="flex group w-full mb-2"
								on:click={() => removeEvent('socialsAttended', event)}
							>
								<span class="text-lg">{event.id}</span>
								<div
									class="ml-auto w-6 h-6 flex items-center justify-center align-middle px-1 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-800"
								>
									<IncompleteIcon className="mx-auto" />
								</div>
							</button>
						{:else}
							<span class="mb-2 text-gray-800 dark:text-gray-200">No Socials Attended</span>
						{/each}
						<div class="flex w-full">
							<select
								class="bg-white dark:bg-gray-950 rounded-l-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
								bind:value={$addSocialField}
							>
								<option value="" disabled selected>Add a Social</option>
								{#each $events?.all ?? [] as event}
									{#if event.type == 'studSocial' && !event.completed?.includes(doc(firestore, 'users', $target.email))}
										<option value={event.name}>{event.name}</option>
									{/if}
								{/each}
							</select>
							<button
								class="text-lg p-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white disabled:bg-gray-400 dark:disabled:bg-gray-500 rounded-r-lg"
								disabled={$addSocialField == ''}
								on:click={() => {
									addEvent('socialsAttended');
								}}><PlusIcon /></button
							>
						</div>
					</div>
				</div>
			</div>
		{:else if $drawerMode == 'edit'}
			<form on:submit|preventDefault={editCandBtn}>
				<div class="grid gap-2 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full mt-4 px-0.5">
					<div class="flex flex-col w-full">
						<label for="cand-fname" class="text-lg">First Name</label>
						<input
							class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
							id="cand-fname"
							type="text"
							bind:value={$editCandFName}
						/>
					</div>
					<div class="flex flex-col w-full">
						<label for="cand-lname" class="text-lg">Last Name</label>
						<input
							class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
							id="cand-lname"
							type="text"
							bind:value={$editCandLName}
						/>
					</div>
					<div class="flex flex-col w-full">
						<label for="cand-email" class="text-lg">Email</label>
						<input
							class="dark:bg-gray-950 text-gray-800 dark:text-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
							id="cand-email"
							type="email"
							disabled
							bind:value={$editCandEmail}
						/>
					</div>
					<div class="flex flex-col w-full">
						<label for="cand-poc" class="text-lg">Point of Contact</label>
						<select
							class="bg-white dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
							id="cand-poc"
							bind:value={$editCandPoc}
						>
							<option value="" disabled selected>Select an Officer</option>
							{#each $memberStore?.members ?? [] as member}
								<option value={member.email}>{member.firstName} {member.lastName}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="grid gap-2 grid-cols-4 w-full mt-4">
					<button
						class="text-white text-lg bg-red-600 hover:bg-red-700 active:bg-red-800 w-full py-2 rounded-lg lg:col-span-1 col-span-2"
						on:click={closeDrawer}
					>
						Cancel
					</button>
					<button
						class="text-white text-lg bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-500 hover:bg-green-700 active:bg-green-800 w-full py-2 rounded-lg lg:col-span-3 col-span-2"
						disabled={editCandValdiation}
						type="submit"
					>
						Confirm
					</button>
				</div>
			</form>
		{:else}
			<p>
				Are you sure you want to delete {$target.firstName}
				{$target.lastName}? This cannot be undone.
			</p>
			<div class="grid gap-2 grid-cols-2 w-full mt-4">
				<button
					class="text-white text-lg bg-gray-400 hover:bg-gray-500 active:bg-gray-600 dark:bg-gray-500 dark:hover:bg-gray-600 dark:active:bg-gray-700 w-full py-2 rounded-lg col-span-1"
					on:click={closeDrawer}
				>
					Cancel
				</button>
				<button
					class="text-white text-lg bg-red-600 hover:bg-red-700 active:bg-red-800 w-full py-2 rounded-lg col-span-1"
					on:click={delCandBtn}
				>
					Confirm
				</button>
			</div>
		{/if}
	{/if}
</Drawer>

<div class="flex flex-col w-full">
	<!-- Add a Candidate -->
	<Card
		className="grid transition-all duration-500 {$newCandShown
			? 'grid-rows-[auto_1fr]'
			: 'grid-rows-[auto_0fr]'}"
	>
		<button class="flex flex-row group" on:click={toggleNewCand} on:keypress={toggleNewCand}>
			<h1 class="text-3xl">Add a Candidate</h1>
			<div
				class="ml-auto flex justify-center align-middle items-center w-9 h-9 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
			>
				<ChevronDownIcon
					className="w-7 h-7 transition-transform  {$newCandShown ? '-rotate-180' : ''}"
				/>
			</div>
		</button>
		<form class="overflow-hidden" on:submit|preventDefault={newCandSubmit}>
			<div class="grid gap-2 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full mt-4 px-0.5">
				<div class="flex flex-col w-full">
					<label for="cand-fname" class="text-lg">First Name</label>
					<input
						class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="cand-fname"
						type="text"
						bind:value={$newCandFName}
					/>
				</div>
				<div class="flex flex-col w-full">
					<label for="cand-lname" class="text-lg">Last Name</label>
					<input
						class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="cand-lname"
						type="text"
						bind:value={$newCandLName}
					/>
				</div>
				<div class="flex flex-col w-full">
					<label for="cand-email" class="text-lg">Email</label>
					<input
						class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="cand-email"
						type="email"
						bind:value={$newCandEmail}
					/>
				</div>
				<div class="flex flex-col w-full">
					<label for="cand-poc" class="text-lg">Point of Contact</label>
					<select
						class="bg-white dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="cand-poc"
						bind:value={$newCandPoc}
					>
						<option value="" disabled selected>Select an Officer</option>
						{#each $memberStore?.members ?? [] as member}
							<option value={member.email}>{member.firstName} {member.lastName}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="grid gap-2 grid-cols-4 w-full mt-4">
				<button
					class="text-white text-lg bg-red-600 hover:bg-red-700 active:bg-red-800 w-full py-2 rounded-lg lg:col-span-1 col-span-2"
					on:click={resetNewCandForm}
				>
					Clear
				</button>
				<button
					class="text-white text-lg bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-500 hover:bg-green-700 active:bg-green-800 w-full py-2 rounded-lg lg:col-span-3 col-span-2"
					disabled={newCandValdiation}
					type="submit"
				>
					Confirm
				</button>
			</div>
		</form>
	</Card>
	<!-- Add an Officer -->
	<Card
		className="grid transition-all duration-500 {$newOfficerShown
			? 'grid-rows-[auto_1fr]'
			: 'grid-rows-[auto_0fr]'}"
	>
		<button class="flex flex-row group" on:click={toggleNewOfficer} on:keypress={toggleNewOfficer}>
			<h1 class="text-3xl">Add an Officer</h1>
			<div
				class="ml-auto flex justify-center align-middle items-center w-9 h-9 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
			>
				<ChevronDownIcon
					className="w-7 h-7 transition-transform {$newOfficerShown ? '-rotate-180' : ''}"
				/>
			</div>
		</button>
		<form class="overflow-hidden" on:submit|preventDefault={newOfficerSubmit}>
			<div class="grid gap-2 md:grid-cols-3 grid-cols-1 w-full mt-4 px-0.5">
				<div class="flex flex-col w-full">
					<label for="officer-fname" class="text-lg">First Name</label>
					<input
						class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="officer-fname"
						type="text"
						bind:value={$newOfficerFName}
					/>
				</div>
				<div class="flex flex-col w-full">
					<label for="officer-lname" class="text-lg">Last Name</label>
					<input
						class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="officer-lname"
						type="text"
						bind:value={$newOfficerLName}
					/>
				</div>
				<div class="flex flex-col w-full">
					<label for="officer-email" class="text-lg">Email</label>
					<input
						class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="officer-email"
						type="email"
						bind:value={$newOfficerEmail}
					/>
				</div>
			</div>
			<div class="grid gap-2 grid-cols-4 w-full mt-4">
				<button
					class="text-white text-lg bg-red-600 hover:bg-red-700 active:bg-red-800 w-full py-2 rounded-lg lg:col-span-1 col-span-2"
					on:click={resetNewOfficerForm}
				>
					Clear
				</button>
				<button
					class="text-white text-lg bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-500 hover:bg-green-700 active:bg-green-800 w-full py-2 rounded-lg lg:col-span-3 col-span-2"
					disabled={newOfficerValdiation}
					type="submit"
				>
					Confirm
				</button>
			</div>
		</form>
	</Card>
	<!-- Add an Event -->
	<Card
		className="grid transition-all duration-500 {$newEventShown
			? 'grid-rows-[auto_1fr]'
			: 'grid-rows-[auto_0fr]'}"
	>
		<button class="flex flex-row group" on:click={toggleNewEvent} on:keypress={toggleNewEvent}>
			<h1 class="text-3xl">Add an Event</h1>
			<div
				class="ml-auto flex justify-center align-middle items-center w-9 h-9 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
			>
				<ChevronDownIcon
					className="w-7 h-7 transition-transform  {$newEventShown ? '-rotate-180' : ''}"
				/>
			</div>
		</button>
		<form class="overflow-hidden" on:submit|preventDefault={newEventSubmit}>
			<div class="grid gap-2 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full mt-4 px-0.5">
				<div class="flex flex-col w-full">
					<label for="cand-fname" class="text-lg">Name</label>
					<input
						class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="cand-fname"
						type="text"
						bind:value={$newEventName}
					/>
				</div>
				<div class="flex flex-col w-full">
					<label for="cand-email" class="text-lg">Location</label>
					<input
						class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="cand-email"
						type="text"
						bind:value={$newEventLocation}
					/>
				</div>
				<div class="flex flex-col w-full">
					<label for="cand-lname" class="text-lg">Time</label>
					<input
						class="dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="cand-lname"
						type="datetime-local"
						bind:value={$newEventTime}
					/>
				</div>
				<div class="flex flex-col w-full">
					<label for="cand-poc" class="text-lg">Category</label>
					<select
						class="bg-white dark:bg-gray-950 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
						id="cand-poc"
						bind:value={$newEventCategory}
					>
						<option value="" disabled selected>Select a Category</option>
						<option value="snackAttack">Snack Attack</option>
						<option value="studMeeting">Studrel Meeting</option>
						<option value="studSocial">Studrel Social</option>
						<option value="noRSVP">No RSVP</option>
					</select>
				</div>
			</div>
			<div class="grid gap-2 grid-cols-4 w-full mt-4">
				<button
					class="text-white text-lg bg-red-600 hover:bg-red-700 active:bg-red-800 w-full py-2 rounded-lg lg:col-span-1 col-span-2"
					on:click={resetNewEventForm}
				>
					Clear
				</button>
				<button
					class="text-white text-lg bg-green-600 disabled:bg-gray-400 dark:disabled:bg-gray-500 hover:bg-green-700 active:bg-green-800 w-full py-2 rounded-lg lg:col-span-3 col-span-2"
					disabled={newEventValidation}
					type="submit"
				>
					Confirm
				</button>
			</div>
		</form>
	</Card>
	<!-- Your Candidates -->
	<Card
		className="grid transition-all duration-500 {$candListShown == 'assigned'
			? 'grid-rows-[auto_1fr]'
			: 'grid-rows-[auto_0fr]'}"
	>
		<button
			class="flex flex-row group"
			on:click={toggleAssignedCandList}
			on:keypress={toggleAssignedCandList}
		>
			<h1 class="text-3xl">Your Candidates</h1>
			<div
				class="ml-auto flex justify-center align-middle items-center w-9 h-9 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
			>
				<ChevronDownIcon
					className="w-7 h-7 transition-transform  {$candListShown == 'assigned'
						? '-rotate-180'
						: ''}"
				/>
			</div>
		</button>
		<div class="overflow-hidden">
			<div class="grid grid-cols-[repeat(6,auto)] gap-2 w-full text-lg">
				{#if isMemberData($userData) && $userData.candidates.length > 0}
					<h2 class="text-xl font-bold sm:col-span-2 col-span-3">Name</h2>
					<h2 class="text-xl font-bold text-center sm:block hidden">Points</h2>
					<h2 class="text-xl font-bold text-center sm:block hidden">Breadth</h2>
					<h2 class="text-xl font-bold text-center">Done</h2>
					<h2 class="text-xl font-bold text-right sm:col-span-1 col-span-2">Actions</h2>
					{#each $memberStore?.candidates ?? [] as candidate}
						{#if candidate.poc.id == $user?.email}
							<span class="sm:col-span-2 col-span-3 text-ellipsis whitespace-nowrap overflow-hidden"
								>{candidate.firstName} {candidate.lastName}</span
							>
							<span class="text-center sm:block hidden"
								><b>{getPoints(candidate)}</b><small>/8</small></span
							>
							{#if getBreadthReq(candidate)}
								<CompleteIcon
									className="w-6 h-6 mx-auto stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg sm:block hidden"
								/>
							{:else}
								<IncompleteIcon
									className="w-6 h-6 mx-auto stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg sm:block hidden"
								/>
							{/if}
							{#if getProjectComplete(candidate)}
								<CompleteIcon
									className="w-6 h-6 mx-auto stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
								/>
							{:else}
								<IncompleteIcon
									className="w-6 h-6 mx-auto stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
								/>
							{/if}
							<div class="flex ml-auto sm:col-span-1 col-span-2">
								<button
									class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
									on:click={() => openDrawer('update', candidate)}
								>
									<AddIcon
										className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-600"
									/>
								</button>
								<button
									class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
									on:click={() => openDrawer('edit', candidate)}
								>
									<EditIcon
										className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-slate-500 dark:hover:text-gray-400"
									/>
								</button>
								<button
									class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7"
									on:click={() => openDrawer('delete', candidate)}
								>
									<TrashIcon
										className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-red-600"
									/>
								</button>
							</div>
						{/if}
					{/each}
				{:else}
					<h2 class="w-full text-center pt-4 mx-auto col-span-6">
						No Candidates are currently assigned to you :(
					</h2>
				{/if}
			</div>
		</div>
	</Card>
	<!-- All Candidates -->
	<Card
		className="grid transition-all duration-500 {$candListShown == 'all'
			? 'grid-rows-[auto_1fr]'
			: 'grid-rows-[auto_0fr]'}"
	>
		<button
			class="flex flex-row group"
			on:click={toggleAllCandList}
			on:keypress={toggleAllCandList}
		>
			<h1 class="text-3xl">All Candidates</h1>
			<div
				class="ml-auto flex justify-center align-middle items-center w-9 h-9 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
			>
				<ChevronDownIcon
					className="w-7 h-7 transition-transform  {$candListShown == 'all' ? '-rotate-180' : ''}"
				/>
			</div>
		</button>
		<div class="overflow-hidden">
			<div class="grid grid-cols-[repeat(6,auto)] gap-2 w-full text-lg">
				<h2 class="text-xl font-bold sm:col-span-2 col-span-3">Name</h2>
				<h2 class="text-xl font-bold text-center sm:block hidden">Points</h2>
				<h2 class="text-xl font-bold text-center sm:block hidden">Breadth</h2>
				<h2 class="text-xl font-bold text-center">Done</h2>
				<h2 class="text-xl font-bold text-right sm:col-span-1 col-span-2">Actions</h2>
				{#each $memberStore?.candidates ?? [] as candidate}
					<span class="sm:col-span-2 col-span-3 text-ellipsis whitespace-nowrap overflow-hidden"
						>{candidate.firstName} {candidate.lastName}</span
					>
					<span class="text-center sm:block hidden"
						><b>{getPoints(candidate)}</b><small>/8</small></span
					>
					{#if getBreadthReq(candidate)}
						<CompleteIcon
							className="w-6 h-6 mx-auto stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg sm:block hidden"
						/>
					{:else}
						<IncompleteIcon
							className="w-6 h-6 mx-auto stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg sm:block hidden"
						/>
					{/if}
					{#if getProjectComplete(candidate)}
						<CompleteIcon
							className="w-6 h-6 mx-auto stroke-2 text-lg bg-green-600 text-white px-1 rounded-lg"
						/>
					{:else}
						<IncompleteIcon
							className="w-6 h-6 mx-auto stroke-2 text-lg bg-red-600 text-white px-1 rounded-lg"
						/>
					{/if}
					<div class="flex ml-auto sm:col-span-1 col-span-2">
						<button
							class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
							on:click={() => openDrawer('update', candidate)}
						>
							<AddIcon
								className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-600"
							/>
						</button>
						<button
							class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
							on:click={() => openDrawer('edit', candidate)}
						>
							<EditIcon
								className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-slate-500 dark:hover:text-gray-400"
							/>
						</button>
						<button
							class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7"
							on:click={() => openDrawer('delete', candidate)}
						>
							<TrashIcon className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-red-600" />
						</button>
					</div>
				{/each}
			</div>
		</div>
	</Card>

	<!-- Upcoming Events -->
	<Card
		className="grid transition-all duration-500 {$eventListShown == 'upcoming'
			? 'grid-rows-[auto_1fr]'
			: 'grid-rows-[auto_0fr]'}"
	>
		<button
			class="flex flex-row group"
			on:click={toggleUpcomingEventList}
			on:keypress={toggleUpcomingEventList}
		>
			<h1 class="text-3xl">Upcoming Events</h1>
			<div
				class="ml-auto flex justify-center align-middle items-center w-9 h-9 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
			>
				<ChevronDownIcon
					className="w-7 h-7 transition-transform  {$eventListShown == 'upcoming'
						? '-rotate-180'
						: ''}"
				/>
			</div>
		</button>
		<div class="overflow-hidden">
			<div class="grid grid-cols-[repeat(6,auto)] gap-2 w-full text-lg">
				<h2 class="text-xl font-bold sm:col-span-2 col-span-4">Name</h2>
				<h2 class="text-xl font-bold text-center lg:block hidden">Location</h2>
				<h2 class="text-xl font-bold text-center lg:block hidden">Time</h2>
				<h2 class="text-xl font-bold text-center lg:col-span-1 col-span-2 sm:block hidden">
					Category
				</h2>
				<h2 class="text-xl font-bold text-right lg:col-span-1 col-span-2">Actions</h2>
				{#each $events?.upcoming ?? [] as event}
					<span class="sm:col-span-2 col-span-4 text-ellipsis whitespace-nowrap overflow-hidden">
						{event.name}
					</span>
					<span class="text-center lg:block hidden">{event.location}</span>
					<span class="text-center lg:block hidden">
						{event.time
							.toDate()
							.toLocaleDateString('en', { month: 'numeric', day: 'numeric', year: '2-digit' })}
						{event.time.toDate().toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}
					</span>

					<span class="text-center lg:col-span-1 col-span-2 sm:block hidden">
						{formatCategory(event.type)}
					</span>

					<div class="flex ml-auto lg:col-span-1 col-span-2">
						<button
							class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
							on:click={() => openDrawer('update', event)}
						>
							<AddIcon
								className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-600"
							/>
						</button>
						<button
							class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
							on:click={() => openDrawer('edit', event)}
						>
							<EditIcon
								className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-slate-500 dark:hover:text-gray-400"
							/>
						</button>
						<button
							class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7"
							on:click={() => openDrawer('delete', event)}
						>
							<TrashIcon className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-red-600" />
						</button>
					</div>
				{/each}
			</div>
		</div>
	</Card>

	<!-- All Events -->
	<Card
		className="grid transition-all duration-500 {$eventListShown == 'all'
			? 'grid-rows-[auto_1fr]'
			: 'grid-rows-[auto_0fr]'}"
	>
		<button
			class="flex flex-row group"
			on:click={toggleAllEventList}
			on:keypress={toggleAllEventList}
		>
			<h1 class="text-3xl">All Events</h1>
			<div
				class="ml-auto flex justify-center align-middle items-center w-9 h-9 rounded-lg group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
			>
				<ChevronDownIcon
					className="w-7 h-7 transition-transform  {$eventListShown == 'all' ? '-rotate-180' : ''}"
				/>
			</div>
		</button>
		<div class="overflow-hidden">
			<div class="grid grid-cols-[repeat(6,auto)] gap-2 w-full text-lg">
				<h2 class="text-xl font-bold sm:col-span-2 col-span-4">Name</h2>
				<h2 class="text-xl font-bold text-center lg:block hidden">Location</h2>
				<h2 class="text-xl font-bold text-center lg:block hidden">Time</h2>
				<h2 class="text-xl font-bold text-center lg:col-span-1 col-span-2 sm:block hidden">
					Category
				</h2>
				<h2 class="text-xl font-bold text-right lg:col-span-1 col-span-2">Actions</h2>
				{#each $events?.all ?? [] as event}
					<span class="sm:col-span-2 col-span-4 text-ellipsis whitespace-nowrap overflow-hidden"
						>{event.name}</span
					>
					<span class="text-center lg:block hidden">{event.location}</span>
					<span class="text-center lg:block hidden">
						{event.time
							.toDate()
							.toLocaleDateString('en', { month: 'numeric', day: 'numeric', year: '2-digit' })}
						{event.time.toDate().toLocaleTimeString('en', { hour: 'numeric', minute: '2-digit' })}
					</span>

					<span class="text-center lg:col-span-1 col-span-2 sm:block hidden">
						{formatCategory(event.type)}
					</span>

					<div class="flex ml-auto lg:col-span-1 col-span-2">
						<button
							class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
							on:click={() => openDrawer('update', event)}
						>
							<AddIcon
								className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-600"
							/>
						</button>
						<button
							class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
							on:click={() => openDrawer('edit', event)}
						>
							<EditIcon
								className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-slate-500 dark:hover:text-gray-400"
							/>
						</button>
						<button
							class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7"
							on:click={() => {
								openDrawer('delete', event);
							}}
						>
							<TrashIcon className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-red-600" />
						</button>
					</div>
				{/each}
			</div>
		</div>
	</Card>
</div>
