import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
//prettier-ignore
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

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
const db = getFirestore(app);


export const {auth,userAuth,} = getAuth(app);
export const firestore = getFirestore(app);


export const createAccount = createUserWithEmailAndPassword;
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(userAuth, provider).catch((error) => console.log(error));

  //Storing Data in Firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = doc(db, "users", `${userAuth.uid}`);
  const snapShot = await getDoc(userRef);

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return {
    userRef,
    onSnapshot,
  };
};