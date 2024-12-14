import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfZ1gw_XUgD0d8IWxj-hSmp0W91G-kPjw",
  authDomain: "tomato-90e4b.firebaseapp.com",
  projectId: "tomato-90e4b",
  storageBucket: "tomato-90e4b.firebasestorage.app",
  messagingSenderId: "147812011118",
  appId: "1:147812011118:web:573eaff5cb708278a72a7f",
  measurementId: "G-9SZMQ9FCP3"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, firebaseApp, db };