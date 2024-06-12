// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPS0w7j2Vko3LDlPwXajNlUaKHaCnbaWY",
  authDomain: "shopping-list-d4411.firebaseapp.com",
  projectId: "shopping-list-d4411",
  storageBucket: "shopping-list-d4411.appspot.com",
  messagingSenderId: "1013304296199",
  appId: "1:1013304296199:web:99705d034a0155da7abba2"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)