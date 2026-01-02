// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBec4QaTxWKKmmCo71NwjwXG46ty1hCrHU",
  authDomain: "tactix11-891a1.firebaseapp.com",
  projectId: "tactix11-891a1",
  storageBucket: "tactix11-891a1.firebasestorage.app",
  messagingSenderId: "120807362022",
  appId: "1:120807362022:web:0a09008c6ec51f9337da27",
  measurementId: "G-FD6D0FM3YX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
