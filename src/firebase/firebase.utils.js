import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyB_k3MA3kfnToZOl_stqKj1EF2JXQ7erJU",
  authDomain: "crwn-db-7a3fd.firebaseapp.com",
  projectId: "crwn-db-7a3fd",
  storageBucket: "crwn-db-7a3fd.appspot.com",
  messagingSenderId: "972792489554",
  appId: "1:972792489554:web:8f4fd65019ab83a906a18b",
  measurementId: "G-XR5E7SRWX4"
};
const app = initializeApp(config);

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(auth, provider).catch((error) => console.log(error));