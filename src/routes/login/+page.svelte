<script>
	import { goto } from '$app/navigation';
	import { user, userData } from '$lib/stores/userStore';
	import Card from '$lib/components/Card.svelte';
	import { firebaseAuth, firestore, provider } from '$lib/firebase';
	import { getUserData, isCandidateData } from '$lib/utils';
	import { signInWithPopup } from 'firebase/auth';
	import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

	const login = () => {
		signInWithPopup(firebaseAuth, provider)
			.then(async (result) => {
				await userData.known();
				if ($userData == null || $userData == undefined) {
					goto('/invalidAccount');
					return;
				}

				if ($userData.candidate) {
					if (isCandidateData($userData)) {
						goto('/candportal');
					} else {
						goto('/invalidAccount');
					}
					return;
				}
				goto('/memberportal');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	};
</script>

<Card className="h-min">
	<h1 class="text-3xl">Welcome to the Studrel Candidate Portal!</h1>
	<p class="text-xl mb-6">
		If you're a Studrel candidate, log in with your Berkeley email to track your progress throughout
		the candidate semester and view important upcoming dates!
	</p>
	<p class="text-xl mb-6">
		If you're a Studrel officer, log in with your HKN email to update your POCs' progress!
	</p>
	<button
		class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-2 rounded"
		on:click|preventDefault={login}>Login</button
	>
</Card>
