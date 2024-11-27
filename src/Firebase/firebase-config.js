import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBdOx01aL-a8Uv7WUC7eeAa3n7cLoi0fSg",
    authDomain: "testing-4bb4f.firebaseapp.com",
    projectId: "testing-4bb4f",
    storageBucket: "testing-4bb4f.firebasestorage.app",
    messagingSenderId: "49115028096",
    appId: "1:49115028096:web:6365d3fe8b48964a3ce465",
    measurementId: "G-J3EDY7ZN7H"
  };


  const app = initializeApp(firebaseConfig)
  
  export const db = getFirestore(app)