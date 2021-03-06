import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
//prettier-ignore
import { getFirestore, doc, getDoc, setDoc, onSnapshot, collection } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyB_k3MA3kfnToZOl_stqKj1EF2JXQ7erJU",
  authDomain: "crwn-db-7a3fd.firebaseapp.com",
  projectId: "crwn-db-7a3fd",
  storageBucket: "crwn-db-7a3fd.appspot.com",
  messagingSenderId: "972792489554",
  appId: "1:972792489554:web:8f4fd65019ab83a906a18b",
  measurementId: "G-XR5E7SRWX4",
};
//Initialize Firebase

const app = initializeApp(config);
const db = getFirestore(app);

export const createAccount = createUserWithEmailAndPassword;
const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () =>
  signInWithPopup(userAuth, provider).catch((error) => console.log(error));

export const { auth, userAuth } = getAuth(app);
export const firestore = getFirestore(app);

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  })
};
