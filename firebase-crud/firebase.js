import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD6Ah1mIwQWrLZcn8NMisXLnSpwTgVo2Ro",
  authDomain: "react-auth-df56f.firebaseapp.com",
  projectId: "react-auth-df56f",
  storageBucket: "react-auth-df56f.appspot.com",
  messagingSenderId: "986560630868",
  appId: "1:986560630868:web:b91e95b7f7dae6f1915dc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db= getFirestore();