// Unlike the other stores, this one does not actually start existing until 
import { firestore } from "$lib/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

// const q = query(collection(firestore, "cities"), where("state", "==", "CA"));
// const unsubscribe = onSnapshot(q, (querySnapshot) => {
//     const cities = [];
//     querySnapshot.forEach((doc) => {
//         cities.push(doc.data().name);
//     });
//     console.log("Current cities in CA: ", cities.join(", "));
// });