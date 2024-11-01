// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
let firebaseApp;
export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyBLyG5o_uwwStpl2onT0Ufug_sda0fefMo",
    authDomain: "booking-room-b1ff8.firebaseapp.com",
    databaseURL: "https://booking-room-b1ff8-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "booking-room-b1ff8",
    storageBucket: "booking-room-b1ff8.firebasestorage.app",
    messagingSenderId: "18314550574",
    appId: "1:18314550574:web:224be7d2772868e306aebf",
    measurementId: "G-5CKEJRQ0P4"
  };


  // Initialize Firebase
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  // Initialize Firebase Auth
  initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });

  firebaseApp = app;
  const database = getDatabase(app); 
return { app, database };
};