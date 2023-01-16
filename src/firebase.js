// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-PFbpldT06LHV7UuaXub3S0M5Hun9LZY",
  authDomain: "steadfastprivateschool.firebaseapp.com",
  projectId: "steadfastprivateschool",
  storageBucket: "steadfastprivateschool.appspot.com",
  messagingSenderId: "571984421647",
  appId: "1:571984421647:web:86828fd7a22aa31ef6547a",
  measurementId: "G-8WTZSTF3D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app)

//const analytics = getAnalytics(app);

export default app; 