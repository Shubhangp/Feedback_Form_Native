// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyut0HFsNwQ-RIs0EB8Z6A3g9YV1d9q4E",
  authDomain: "feedback-form-bc848.firebaseapp.com",
  databaseURL: "https://feedback-form-bc848-default-rtdb.firebaseio.com",
  projectId: "feedback-form-bc848",
  storageBucket: "feedback-form-bc848.appspot.com",
  messagingSenderId: "914160323872",
  appId: "1:914160323872:web:861e2521550868b1a31b45",
  measurementId: "G-CQRTFRHBYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);