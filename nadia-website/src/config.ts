// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2GxdwLUn5bTYxeURz0IXNacQ-nMQPhk8",
  authDomain: "realestate-portfol.firebaseapp.com",
  projectId: "realestate-portfol",
  storageBucket: "realestate-portfol.firebasestorage.app",
  messagingSenderId: "376582734599",
  appId: "1:376582734599:web:a908aa648eb9a68dcabba2",
  measurementId: "G-NHLK9TMWT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);