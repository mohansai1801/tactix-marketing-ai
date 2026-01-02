import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration - these are publishable keys (safe for client-side)
// ⚠️ IMPORTANT: Replace these with YOUR Firebase project credentials from Firebase Console
// Go to: Firebase Console → Project Settings → General → Your apps → Web app
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",           // Replace with your API key
  authDomain: "YOUR_PROJECT.firebaseapp.com", // Replace with your auth domain
  projectId: "YOUR_PROJECT_ID",               // Replace with your project ID
  storageBucket: "YOUR_PROJECT.appspot.com",  // Replace with your storage bucket
  messagingSenderId: "YOUR_SENDER_ID",        // Replace with your sender ID
  appId: "YOUR_APP_ID",                       // Replace with your app ID
};

// Initialize Firebase (prevent duplicate initialization during HMR)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;
