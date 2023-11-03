import { firestore } from "$lib/firebase";
import { collection, query, onSnapshot, orderBy, Timestamp, DocumentReference } from "firebase/firestore";
import { readable } from "svelte/store";
import type { Store } from "./store";
import { isEvent } from "$lib/utils";

export interface Event {
    name: string;
    time: Timestamp;
    rsvp?: Array<DocumentReference>;
    completed?: Array<DocumentReference>;
    location: string;
    type: string;
}

export interface EventStoreData {
    upcoming: Array<Event>;
    all: Array<Event>;
}

export type EventStore = Store<EventStoreData | null>;

const q = query(collection(firestore, "events"), orderBy('time'));
function createEventStore(): EventStore {
    const { subscribe } = readable<EventStoreData | null>(
        undefined,
        set => onSnapshot(q, (querySnapshot) => {
            const store: EventStoreData = { upcoming: [], all: [] }
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (isEvent(data)) {
                    store.all.push(data);
                    if (data.time.toMillis() > Date.now()) {
                        store.upcoming.push(data);
                    }
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

export const events = createEventStore();