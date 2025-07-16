// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBfyC0ntHDIVAsJs8jHJRkWkmI77EgofW4",
  authDomain: "cinescore-99d79.firebaseapp.com",
  projectId: "cinescore-99d79",
  storageBucket: "cinescore-99d79.firebasestorage.com",
  messagingSenderId: "240276581859",
  appId: "1:240276581859:web:a2edadc0481734e15bc4d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
