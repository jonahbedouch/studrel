// Unlike the other stores, this one does not actually start existing until 
import { firestore } from "$lib/firebase";
import { isCandidateData, isMemberData } from "$lib/utils";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { CandidateData, MemberData } from "./userStore";
import { readable } from "svelte/store";
import type { Store } from "./store";

export interface MemberStoreData {
    candidates: Array<CandidateData>;
    candidateEmails: Array<string>;
    members: Array<MemberData>;
    memberEmails: Array<string>
}

export type MemberStore = Store<MemberStoreData | null>

const q = query(collection(firestore, "users"));
function createMemberStore(): MemberStore {
    const { subscribe } = readable<MemberStoreData | null>(
        undefined,
        set => onSnapshot(q, (querySnapshot) => {
            const store: MemberStoreData = { candidates: [], candidateEmails: [], members: [], memberEmails: [] }
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (isCandidateData(data)) {
                    store.candidates.push(data);
                    store.candidateEmails.push(data.email);
                }
                if (isMemberData(data)) {
                    store.members.push(data);
                    store.memberEmails.push(data.email);
                }
            });
            set(store);
        })
    )

    const known = () => {
        return new Promise<void>(resolve => {
            let unsub = () => { }
            unsub = subscribe(data => {
                if (data !== undefined) {
                    resolve()
                    unsub()
                }
            })
        })
    }

    return { subscribe, known }
}

export let memberStore: MemberStore | null;
export function initMemberStore() {
    if (memberStore == null) {
        memberStore = createMemberStore();
    }
}