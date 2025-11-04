
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDs6tKdoPjeNxiZSiy0PbgSc5-QDdv2PcE",
  authDomain: "explore-email-password-a-2bf49.firebaseapp.com",
  projectId: "explore-email-password-a-2bf49",
  storageBucket: "explore-email-password-a-2bf49.firebasestorage.app",
  messagingSenderId: "765659629509",
  appId: "1:765659629509:web:d41936074e8b3427bfedac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;