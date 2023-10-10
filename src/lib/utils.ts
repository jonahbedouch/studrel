import { signOut, type User } from "firebase/auth";
import { firebaseAuth, firestore } from "./firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";
import type { CandidateData, MemberData, UserData } from "./authStore";
import { goto } from "$app/navigation";

export interface Event {
    name: string;
    time: Timestamp;
    rsvp?: Array<string>;
    location: string;
    type: string;
}

export async function getUserData(user: User | null) {
    const docRef = doc(firestore, 'users', user?.email ?? '');
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    // Ignoring what is frankly an incredibly unsafe typecast
    // If I had more time I'd learn what on earth a firestore data
    // model is... or I would just use MongoDB since it's the objectively
    // correct NoSQL database.
    // @ts-ignore
    const data: MemberData | CandidateData | undefined = docSnap.data();

    return data;
}

export const logout = () => {
    signOut(firebaseAuth);
    goto('/login');
};

export function isUserData(x: any): x is UserData {
    return typeof x == "object" &&
        "firstName" in x &&
        typeof x.firstName == "string" &&
        "lastName" in x &&
        typeof x.lastName == "string" &&
        "candidate" in x &&
        typeof x.candidate == "boolean";
}
export function isCandidateData(x: any): x is CandidateData {
    return isUserData(x) &&
        "poc" in x &&
        "eventsOrganized" in x &&
        typeof x.eventsOrganized == "object" &&
        "graphicsCreated" in x &&
        typeof x.graphicsCreated == "object" &&
        "meetingsAttended" in x &&
        typeof x.meetingsAttended == "object" &&
        "snackAttacksAttended" in x &&
        typeof x.snackAttacksAttended == "object" &&
        "merchDesigned" in x &&
        typeof x.merchDesigned == "boolean" &&
        "spotlightCreated" in x &&
        typeof x.merchDesigned == "boolean" &&
        "rsvps" in x &&
        typeof x.rsvps == "object";
}

export function isMemberData(x: any): x is MemberData {
    return isUserData(x) &&
        "candidates" in x &&
        typeof x.candidates == "object";
}