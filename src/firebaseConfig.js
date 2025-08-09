// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC1zh_648UAtsRW8UvIOvaLNzwnMo9ng9w",
    authDomain: "stoked-archway-463510-b3.firebaseapp.com",
    projectId: "stoked-archway-463510-b3",
    storageBucket: "stoked-archway-463510-b3.appspot.com", // ⚠️ Corrigé ici !
    messagingSenderId: "981371822148",
    appId: "1:981371822148:web:bf3a6570128ecb053b9c11",
    measurementId: "G-00CMBEVXQL"
};

// Initialisation
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
