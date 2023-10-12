import { firestore } from "$lib/firebase";
import { collection, query, onSnapshot, orderBy, Timestamp } from "firebase/firestore";
import { readable } from "svelte/store";
import type { Store } from "./store";
import { isLink } from "$lib/utils";

export interface Link {
    name: string;
    url: string;
}

export type EventStore = Store<Array<Link> | null>;

const q = query(collection(firestore, "links"));
function createLinkStore(): EventStore {
    const { subscribe } = readable<Array<Link> | null>(
        undefined,
        set => onSnapshot(q, (querySnapshot) => {
            const store: Array<Link> = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (isLink(data)) {
                    store.push(data);
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

export const links = createLinkStore();