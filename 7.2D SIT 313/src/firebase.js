import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; // Import getStorage for Firebase Storage
import { getFirestore } from "firebase/firestore"; // Import getFirestore for Firebase Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDVr8Y1Rl4NuJezcCqBwndVFAfTiKoNz4",
  authDomain: "login-signup-database-efce8.firebaseapp.com",
  projectId: "login-signup-database-efce8",
  storageBucket: "login-signup-database-efce8.appspot.com",
  messagingSenderId: "698414376205",
  appId: "1:698414376205:web:dd23132243ee17217b3c44",
  measurementId: "G-B1HLK2MVE4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app); // Initialize Firebase Storage
const txtDB = getFirestore(app); // Initialize Firebase Firestore

export {getFirestore, imgDB, txtDB };
