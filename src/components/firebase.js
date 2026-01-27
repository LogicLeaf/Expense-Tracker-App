import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCcQ7BAJrLL0YZA9dlSFbRSJAZLMDX5h-8",
  authDomain: "expense-tracker-app-5b136.firebaseapp.com",
  projectId: "expense-tracker-app-5b136",
  storageBucket: "expense-tracker-app-5b136.firebasestorage.app",
  messagingSenderId: "398130420439",
  appId: "1:398130420439:web:dfb50cfa3773eac2d06e92",
};


// Initialize Firebase"
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };