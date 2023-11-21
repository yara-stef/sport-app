import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
} from 'firebase/auth';
import {
  getFirestore
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDegFE3t6ZjZLzyZDRTuq3P_1er28amXtg",
    authDomain: "sport-app-501ab.firebaseapp.com",
    projectId: "sport-app-501ab",
    storageBucket: "sport-app-501ab.appspot.com",
    messagingSenderId: "927494999997",
    appId: "1:927494999997:web:d945ae30a828309c98ccd4",
    measurementId: "G-XGKX0M69E0"
  };


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const db = getFirestore(app);
const logout = () => {
  signOut(auth);
}
export default app;
export {
  db,
  logout,
}
