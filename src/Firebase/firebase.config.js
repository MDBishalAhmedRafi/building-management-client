// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGSdRlRzfCzUnLkoOh6988x35LwCMfNjE",
  authDomain: "building-management-project.firebaseapp.com",
  projectId: "building-management-project",
  storageBucket: "building-management-project.firebasestorage.app",
  messagingSenderId: "571905250663",
  appId: "1:571905250663:web:df1099c772591b24c44bc2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;