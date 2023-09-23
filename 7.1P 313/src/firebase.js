
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCDVr8Y1Rl4NuJezcCqBwndVFAfTiKoNz4",
    authDomain: "login-signup-database-efce8.firebaseapp.com",
    projectId: "login-signup-database-efce8",
    storageBucket: "login-signup-database-efce8.appspot.com",
    messagingSenderId: "698414376205",
    appId: "1:698414376205:web:dd23132243ee17217b3c44",
    measurementId: "G-B1HLK2MVE4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, analytics };
