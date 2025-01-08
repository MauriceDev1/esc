// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANi8huZHYjWXo-Z6UOBRrIbSgqFRuejPM",
  authDomain: "esc-sa.firebaseapp.com",
  databaseURL: "https://esc-sa-default-rtdb.firebaseio.com",
  projectId: "esc-sa",
  storageBucket: "esc-sa.firebasestorage.app",
  messagingSenderId: "733212921373",
  appId: "1:733212921373:web:5b97ba917c7dc4bdb380f4",
  measurementId: "G-G2G54CQV51"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export { auth }
