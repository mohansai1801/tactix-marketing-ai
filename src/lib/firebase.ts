import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration - these are publishable keys (safe for client-side)
// Replace with your Firebase project credentials from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA3EtFtxbb0aV6O6Sedr1KF29QOX5F2aHc",
  authDomain: "tactix-marketing-ai.firebaseapp.com",
  projectId: "tactix-marketing-ai",
  storageBucket: "tactix-marketing-ai.firebasestorage.app",
  messagingSenderId: "733893806970",
  appId: "1:733893806970:web:49e31dbcfb5ca3832b64c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;
