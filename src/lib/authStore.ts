import { onAuthStateChanged, type Unsubscribe, type User } from 'firebase/auth';
import { readable, writable } from 'svelte/store';
import { firebaseAuth, firestore } from './firebase';
import { onSnapshot, type CollectionReference, type DocumentReference, doc } from 'firebase/firestore';
import type { Invalidator, Subscriber, Unsubscriber, Updater } from 'svelte/motion';

export interface UserData {
    candidate: boolean;
    firstName: string;
    lastName: string
}

export interface CandidateData extends UserData {
    poc: DocumentReference;
    eventsOrganized: Array<String>;
    graphicsCreated: Array<String>;
    meetingsAttended: Array<String>;
    snackAttacksAttended: Array<String>;
    rsvps: Array<String>;
    merchDesigned: boolean;
    spotlightCreated: boolean;
}

export interface MemberData extends UserData {
    candidates: Array<DocumentReference>;
}

export interface UserDataStore {
    set: (this: void, value: UserData | null) => void;
    subscribe: (this: void, run: Subscriber<UserData | null>, invalidate?: Invalidator<UserData | null> | undefined) => Unsubscriber;
    update: (this: void, updater: Updater<UserData | null>) => void;
    known: () => Promise<void>;
}

export interface CandidateDataStore {
    set: (this: void, value: CandidateData | null) => void;
    subscribe: (this: void, run: Subscriber<CandidateData | null>, invalidate?: Invalidator<CandidateData | null> | undefined) => Unsubscriber;
    update: (this: void, updater: Updater<CandidateData | null>) => void;
    known: () => Promise<void>;
}

export interface MemberDataStore {
    set: (this: void, value: MemberData | null) => void;
    subscribe: (this: void, run: Subscriber<MemberData | null>, invalidate?: Invalidator<MemberData | null> | undefined) => Unsubscriber;
    update: (this: void, updater: Updater<MemberData | null>) => void;
    known: () => Promise<void>;
}

function createUserStore() {
    const { subscribe } = readable<User | null>(
        undefined,
        set => onAuthStateChanged(firebaseAuth, set)
    )

    const known = new Promise<void>(resolve => {
        let unsub = () => { }
        unsub = subscribe(user => {
            if (user !== undefined) {
                resolve()
                unsub()
            }
        })
    })

    return { subscribe, known }
}

function createDataStore() {
    const { subscribe } = readable<UserData | null | undefined>(
        undefined,
        set => {
            user.known.then(() => {
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