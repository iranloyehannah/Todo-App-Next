import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpSfZrAODwtlfbPil1lauSbG48sQlW0yk",
  authDomain: "todo-app-aeaa0.firebaseapp.com",
  projectId: "todo-app-aeaa0",
  storageBucket: "todo-app-aeaa0.firebasestorage.app",
  messagingSenderId: "244654122693",
  appId: "1:244654122693:web:c69a4f54112c27bed272ac",
  measurementId: "G-WZMB1RCDF4"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);