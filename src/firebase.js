import { initializeApp } from "firebase/app";
​​import {
​​  GoogleAuthProvider,
​​  getAuth,
​​  signInWithPopup,
​​  signInWithEmailAndPassword,
​​  createUserWithEmailAndPassword,
​​  sendPasswordResetEmail,
​​  signOut,
​​} from "firebase/auth";
​​import {
​​  getFirestore,
​​  query,
​​  getDocs,
​​  collection,
​​  where,
​​  addDoc,
​​} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1Yv6Xy7-3eul2KGSTOfB2rXR9nMWZa04",
    authDomain: "todo-app-c2762.firebaseapp.com",
    projectId: "todo-app-c2762",
    storageBucket: "todo-app-c2762.appspot.com",
    messagingSenderId: "542138691675",
    appId: "1:542138691675:web:1b40a5d497fa9464350f7e",
    measurementId: "G-JZTY86BKY5"
}