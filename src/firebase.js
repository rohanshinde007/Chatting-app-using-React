import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZF5lx0Jtp8WNfZi8Cb3rCL7DkFMiiLdk",
  authDomain: "chat-1ea1d.firebaseapp.com",
  projectId: "chat-1ea1d",
  storageBucket: "chat-1ea1d.appspot.com",
  messagingSenderId: "1050545936607",
  appId: "1:1050545936607:web:ef719b974e8ebb7885b16a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth =getAuth();
export const storage = getStorage();
export const  db = getFirestore();