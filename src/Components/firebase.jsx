// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
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
const storage = getStorage(app);
const auth =  getAuth(app);

export {storage,auth};