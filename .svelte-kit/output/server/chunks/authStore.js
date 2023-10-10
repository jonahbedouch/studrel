import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { r as readable, w as writable } from "./index.js";
import { getApps, initializeApp } from "firebase/app";
import "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const PUBLIC_FIREBASE_API_KEY = "AIzaSyAYBKleOEq5VffxDzOvtWrBjc8G-dOh5N4";
const PUBLIC_FIREBASE_AUTH_DOMAIN = "studrel.firebaseapp.com";
const PUBLIC_FIREBASE_PROJECT_ID = "studrel";
const PUBLIC_FIREBASE_STORAGE_BUCKET = "studrel.appspot.com";
const PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "173773565615";
const PUBLIC_FIREBASE_APP_ID = "1:173773565615:web:fbb308b65bad5ae3b26e5a";
const PUBLIC_FIREBASE_MEASUREMENT_ID = "G-D6Y9G1S4BF";
const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID,
  measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
};
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const firebaseAuth = getAuth();
new GoogleAuthProvider();
const firestore = getFirestore();
function createUserStore() {
  const { subscribe } = readable(
    void 0,
    (set) => onAuthStateChanged(firebaseAuth, set)
  );
  const known = new Promise((resolve) => {
    let unsub = () => {
    };
    unsub = subscribe((user2) => {
      if (user2 !== void 0) {
        resolve();
        unsub();
      }
    });
  });
  return { subscribe, known };
}
function createDataStore() {
  const { set, subscribe, update } = writable(
    void 0
  );
  const known = new Promise((resolve) => {
    let unsub = () => {
    };
    unsub = subscribe((user2) => {
      if (user2 !== void 0) {
        resolve();
        unsub();
      }
    });
  });
  return { set, subscribe, update, known };
}
const user = createUserStore();
const userData = createDataStore();
export {
  userData as a,
  firestore as f,
  user as u
};
