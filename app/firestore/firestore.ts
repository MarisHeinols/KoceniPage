import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, doc, setDoc } from "firebase/firestore"; 
import type { UtilityMeeter } from "~/pages/utilityMeeterPage";

const firebaseConfig = {
  apiKey: "AIzaSyBkTpRIlQZsbCiAfgJoPZs3PANt9FmrRBY",
  authDomain: "kocenipage.firebaseapp.com",
  projectId: "kocenipage",
  storageBucket: "kocenipage.firebasestorage.app",
  messagingSenderId: "929360571497",
  appId: "1:929360571497:web:d48e77c18e9588552cc6f8",
  measurementId: "G-QYSS3W4WGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const addNewEntry = async (utilityMeeter:UtilityMeeter) => {
    try {
      const docRef = doc(db, "utilityMeeters", utilityMeeter.id);

    await setDoc(docRef, utilityMeeter);

    console.log("Document written with ID:", utilityMeeter.id);
  return true
} catch (e) {
  console.error("Error adding document: ", e);
   return false;
}
}