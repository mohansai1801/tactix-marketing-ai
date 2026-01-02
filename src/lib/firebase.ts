import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBec4QaTxWKKmmCo71NwjwXG46ty1hCrHU",
  authDomain: "tactix11-891a1.firebaseapp.com",
  projectId: "tactix11-891a1",
  storageBucket: "tactix11-891a1.firebasestorage.app",
  messagingSenderId: "120807362022",
  appId: "1:120807362022:web:0a09008c6ec51f9337da27",
  measurementId: "G-FD6D0FM3YX",
};

// Initialize Firebase (prevent duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = getAnalytics(app);

// Export auth instance
export const auth = getAuth(app);
