<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import ChevronDownIcon from '$lib/components/icons/ChevronDownIcon.svelte';
	import CompleteIcon from '$lib/components/icons/CompleteIcon.svelte';
	import EditIcon from '$lib/components/icons/EditIcon.svelte';
	import IncompleteIcon from '$lib/components/icons/IncompleteIcon.svelte';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';
	import { firestore } from '$lib/firebase';
	import { memberStore } from '$lib/stores/memberStore';
	import { user, type CandidateData } from '$lib/stores/userStore';
	import { getBreadthReq, getPoints, getProjectComplete } from '$lib/utils';
	import { arrayUnion, doc, setDoc, updateDoc } from 'firebase/firestore';
	import { writable, type Writable } from 'svelte/store';
	// Page Control
	const newCandShown = writable(false);
	const newOfficerShown = writable(false);
	const candListShown: Writable<'assigned' | 'all' | null> = writable('assigned');

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
			rsvps: [],
			merchDesigned: false,
			spotlightCreated: false
		};

		await setDoc(doc(firestore, 'users', newCand.email), newCand);
		await updateDoc(newCand.poc, {
			candidates: arrayUnion(doc(firestore, 'users', newCand.email))
		});

		resetNewCandForm();
	};

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

	const addReqBtn = (candidate: CandidateData) => {
		/* Add later */
	};
	const editCandBtn = (candidate: CandidateData) => {
		/* Add later */
	};
	const delCandBtn = (candidate: CandidateData) => {
		/* Add later */
	};
</script>

<div class="flex flex-col w-full">
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
			<div class="grid gap-2 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full mt-4 px-0.5">
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
						<option value="" disabled selected>Select a Candidate</option>
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
		<form class="overflow-hidden">
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
							><b>{getPoints(candidate)}</b><small>/6</small></span
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
								on:click={() => addReqBtn(candidate)}
							>
								<AddIcon
									className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-600"
								/>
							</button>
							<button
								class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
								on:click={() => editCandBtn(candidate)}
							>
								<EditIcon
									className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-slate-500 dark:hover:text-gray-400"
								/>
							</button>
							<button
								class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7"
								on:click={() => delCandBtn(candidate)}
							>
								<TrashIcon
									className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-red-600"
								/>
							</button>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</Card>
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
					{#if candidate.poc.id == $user?.email}
						<span class="sm:col-span-2 col-span-3 text-ellipsis whitespace-nowrap overflow-hidden"
							>{candidate.firstName} {candidate.lastName}</span
						>
						<span class="text-center sm:block hidden"
							><b>{getPoints(candidate)}</b><small>/6</small></span
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
								on:click={() => addReqBtn(candidate)}
							>
								<AddIcon
									className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-green-700 dark:hover:text-green-600"
								/>
							</button>
							<button
								class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7 mr-2"
								on:click={() => editCandBtn(candidate)}
							>
								<EditIcon
									className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-slate-500 dark:hover:text-gray-400"
								/>
							</button>
							<button
								class="bg-gray-300 dark:bg-gray-800 rounded-lg w-7 h-7"
								on:click={() => delCandBtn(candidate)}
							>
								<TrashIcon
									className="w-7 h-7 stroke-2 px-1 dark:text-gray-200 hover:text-red-600"
								/>
							</button>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</Card>
</div>
