import type { Invalidator, Subscriber, Unsubscriber } from "svelte/motion";

export interface Store<T> {
    subscribe: (this: void, run: Subscriber<T>, invalidate?: Invalidator<T> | undefined) => Unsubscriber;
    known: () => Promise<void>;
}