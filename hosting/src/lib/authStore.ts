import { onAuthStateChanged, type User } from 'firebase/auth';
import { readable, writable } from 'svelte/store';
import { firebaseAuth } from './firebase';
import type { CollectionReference, DocumentReference } from 'firebase/firestore';
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
    known: Promise<void>;
}

export interface CandidateDataStore {
    set: (this: void, value: CandidateData | null) => void;
    subscribe: (this: void, run: Subscriber<CandidateData | null>, invalidate?: Invalidator<CandidateData | null> | undefined) => Unsubscriber;
    update: (this: void, updater: Updater<CandidateData | null>) => void;
    known: Promise<void>;
}

export interface MemberDataStore {
    set: (this: void, value: MemberData | null) => void;
    subscribe: (this: void, run: Subscriber<MemberData | null>, invalidate?: Invalidator<MemberData | null> | undefined) => Unsubscriber;
    update: (this: void, updater: Updater<MemberData | null>) => void;
    known: Promise<void>;
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
    const { set, subscribe, update } = writable<UserData | null>(
        undefined
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

    return { set, subscribe, update, known }
}

export const user = createUserStore();
export const userData = createDataStore();