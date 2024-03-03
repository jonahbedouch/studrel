import { onAuthStateChanged, type Unsubscribe, type User } from 'firebase/auth';
import { readable } from 'svelte/store';
import { firebaseAuth, firestore } from '../firebase';
import { onSnapshot, type DocumentReference, doc } from 'firebase/firestore';
import type { Store } from './store';

export interface UserData {
    candidate: boolean;
    firstName: string;
    lastName: string
    email: string;
}

export interface CandidateData extends UserData {
    poc: DocumentReference;
    eventsOrganized: Array<String>;
    graphicsCreated: Array<String>;
    meetingsAttended: Array<DocumentReference>;
    socialsAttended: Array<DocumentReference>;
    snackAttacksAttended: Array<DocumentReference>;
    rsvps: Array<DocumentReference>;
    spotlightCreated: boolean;
}

export interface MemberData extends UserData {
    candidates: Array<DocumentReference>;
}

export type AuthStore = Store<User | null>;
export type UserStore = Store<UserData | null | undefined>;
export type CandidateStore = Store<CandidateData | null | undefined>;
export type MemberStore = Store<MemberData | null | undefined>;

function createUserStore(): AuthStore {
    const { subscribe } = readable<User | null>(
        undefined,
        set => onAuthStateChanged(firebaseAuth, set)
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

function createDataStore(): UserStore {
    const { subscribe } = readable<UserData | null | undefined>(
        undefined,
        set => {
            user.known().then(() => {
                let userData: User | null;
                let firebase_unsub: Unsubscribe | null;
                const user_unsub = user.subscribe(user => {
                    userData = user;
                    if (firebase_unsub) {
                        set(undefined);
                        firebase_unsub();
                    }

                    if (userData == null || userData.email == null) {
                        return;
                    }

                    firebase_unsub = onSnapshot(doc(firestore, "users", userData.email), (doc) => {
                        const data = doc.data() as UserData | undefined;
                        if (data == undefined) {
                            set(null);
                        }
                        set(data);
                    })

                })
            })
        })

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

export const user = createUserStore();
export const userData = createDataStore();