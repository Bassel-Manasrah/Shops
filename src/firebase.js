// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebase = {
  apiKey: "AIzaSyBIYewHL8wqdNvflyqq46s7mIqZffhJFjQ",
  authDomain: "shops-d83a2.firebaseapp.com",
  projectId: "shops-d83a2",
  storageBucket: "shops-d83a2.appspot.com",
  messagingSenderId: "649974213628",
  appId: "1:649974213628:web:d6ce3cfaa1ea8e8ba92079",
};

// Initialize Firebase app
const app = initializeApp(firebase);

// Get the authentication instance
export const auth = getAuth(app);
export const storage = getStorage(app);
// Get the Firebase Realtime Database instance
export const database = getFirestore(app);

export default app;
