import { signOut, type User } from "firebase/auth";
import { firebaseAuth, firestore } from "./firebase";
import { doc, DocumentReference, getDoc, Timestamp } from "firebase/firestore";
import type { CandidateData, MemberData, UserData } from "./stores/userStore";
import { goto } from "$app/navigation";
import type { Event } from "./stores/eventStore";
import type { Link } from "./stores/linkStore";

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
    return x != null && typeof x == "object" &&
        "firstName" in x && typeof x.firstName == "string" &&
        "lastName" in x && typeof x.lastName == "string" &&
        "email" in x && typeof x.email == "string" &&
        "candidate" in x && typeof x.candidate == "boolean";
}

export function isCandidateData(x: any): x is CandidateData {
    return isUserData(x) &&
        "poc" in x &&
        "eventsOrganized" in x && typeof x.eventsOrganized == "object" &&
        "graphicsCreated" in x && typeof x.graphicsCreated == "object" &&
        "meetingsAttended" in x && typeof x.meetingsAttended == "object" &&
        "socialsAttended" in x && typeof x.socialsAttended == "object" &&
        "snackAttacksAttended" in x && typeof x.snackAttacksAttended == "object" &&
        "spotlightCreated" in x && typeof x.spotlightCreated == "boolean" &&
        "rsvps" in x && typeof x.rsvps == "object";
}

export function isMemberData(x: any): x is MemberData {
    return isUserData(x) &&
        "candidates" in x && typeof x.candidates == "object";
}

export function isEvent(x: any): x is Event {
    return x != null && typeof x == "object" &&
        "name" in x && typeof x.name == "string" &&
        "time" in x && typeof x.time == "object" &&
        "location" in x && typeof x.location == "string" &&
        "type" in x && typeof x.type == "string";
}

export function isLink(x: any): x is Link {
    return x != null && typeof x == "object" &&
        "name" in x && typeof x.name == "string" &&
        "url" in x && typeof x.url == "string";
}

export function getGraphicPts(candidate: CandidateData): number {
    return (candidate.graphicsCreated.length * 2) + ((candidate.spotlightCreated ? 1 : 0) * 3);
}

export function getEventPts(candidate: CandidateData): number {
    return (candidate.snackAttacksAttended.length * 1) + (candidate.eventsOrganized.length * 4);
}

export function getEngagementPts(candidate: CandidateData): number {
    return (candidate.meetingsAttended.length * 1) + (candidate.socialsAttended.length * 1)
}

export function getPoints(candidate: CandidateData): number {
    return getGraphicPts(candidate) + getEventPts(candidate) + getEngagementPts(candidate);
}

export function getBreadthReq(candidate: CandidateData): boolean {
    return getGraphicPts(candidate) > 0 && getEventPts(candidate) > 0 && getEngagementPts(candidate) > 0;
}

export function getProjectComplete(candidate: CandidateData): boolean {
    return getPoints(candidate) >= 6 && getBreadthReq(candidate);
}

export function includesRef(array: Array<DocumentReference> | undefined, document: DocumentReference) {
    return array ? array.some((value) => {
        return value.path == document.path;
    }) : false;
}