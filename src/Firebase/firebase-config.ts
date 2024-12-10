import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChvhEmejw0_Hp5FV8jAhSd5LPajo_RoBg",
  authDomain: "booking-c115f.firebaseapp.com",
  projectId: "booking-c115f",
  storageBucket: "booking-c115f.firebasestorage.app",
  messagingSenderId: "263440776632",
  appId: "1:263440776632:web:c02298486de329ddf5e34d",
  measurementId: "G-5F4KWQL7GT",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
