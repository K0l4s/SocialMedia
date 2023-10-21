// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEwTvN2IKBF1wvs6_kadzhjok9XW4EDqA",
  authDomain: "social-media-c9580.firebaseapp.com",
  projectId: "social-media-c9580",
  storageBucket: "social-media-c9580.appspot.com",
  messagingSenderId: "413341871429",
  appId: "1:413341871429:web:7a1f615429c7617b4ae22c",
  measurementId: "G-901PBSX5MN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
 const storage = getStorage(app,"gs://social-media-c9580.appspot.com");

export { app, analytics, auth, storage };