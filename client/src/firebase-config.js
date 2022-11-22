// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWu_yH9VQlCdZku-A2OdNA1DB9qCeL6lQ",
  authDomain: "ropstam-crud.firebaseapp.com",
  projectId: "ropstam-crud",
  storageBucket: "ropstam-crud.appspot.com",
  messagingSenderId: "234628717740",
  appId: "1:234628717740:web:ec0778156bd89be49c9309",
  measurementId: "G-6QJRM54Y91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
