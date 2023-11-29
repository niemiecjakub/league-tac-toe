// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa6CND9zcLtBVxTpZQyntGL8BRCXrmkto",
  authDomain: "league-tac-toe.firebaseapp.com",
  projectId: "league-tac-toe",
  storageBucket: "league-tac-toe.appspot.com",
  messagingSenderId: "1032380731285",
  appId: "1:1032380731285:web:d05c281be2cab658a4709c",
  measurementId: "G-67RQDBGNHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)