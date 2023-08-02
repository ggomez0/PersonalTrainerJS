import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuiAcKYtvifNG4M1PdQIrviozLqw3Xi1s",
  authDomain: "fir-login-cd06d.firebaseapp.com",
  projectId: "fir-login-cd06d",
  storageBucket: "fir-login-cd06d.appspot.com",
  messagingSenderId: "906227027561",
  appId: "1:906227027561:web:b2b090329006fab8f45cf8",
};

const FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth, FirebaseApp as default };
