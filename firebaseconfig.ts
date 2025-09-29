// Localização: neuroflow/firebaseconfig.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth'; 


const firebaseConfig = {
    apiKey: "AIzaSyBacZWrsUxdy600LOOe_xrLpLIflfJa5SY",
    authDomain: "neuroflow-cc57f.firebaseapp.com",
    projectId: "neuroflow-cc57f",
    storageBucket: "neuroflow-cc57f.firebasestorage.app",
    messagingSenderId: "749971798141",
    appId: "1:749971798141:web:7396aae3af6b0a33549914"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 

export const db = getFirestore(app);
export const storage = getStorage(app);