// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth ,signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBckHscGM-k-MlWZeX-ZjJkme2H_0hWapM",
  authDomain: "firseay.firebaseapp.com",
  databaseURL: "https://firseay-default-rtdb.firebaseio.com",
  projectId: "firseay",
  storageBucket: "firseay.appspot.com",
  messagingSenderId: "323329038731",
  appId: "1:323329038731:web:a4dff73045d6cfdae4378e",
  measurementId: "G-FHXB94Q3K0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth=getAuth(app);
//auth.settings.appVerificationDisabledForTesting= true;
export { db ,storage,auth,signOut};
