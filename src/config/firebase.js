// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBXgyHSxZJr1qHfF8VwDqOOeiesNiNuW2c",
  authDomain: "hotel-adumbrate.firebaseapp.com",
  projectId: "hotel-adumbrate",
  storageBucket: "hotel-adumbrate.appspot.com",
  messagingSenderId: "302323088903",
  appId: "1:302323088903:web:c02e45af309c37e15874a2",
  measurementId: "G-XLMVQXPR72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};