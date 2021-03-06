import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBPQwbp3b-krgoRC-e7mSjKbAIAX1kbwbA",
    authDomain: "e-commerce-system-3b943.firebaseapp.com",
    databaseURL: "https://e-commerce-system-3b943.firebaseio.com",
    projectId: "e-commerce-system-3b943",
    storageBucket: "e-commerce-system-3b943.appspot.com",
    messagingSenderId: "905958098538",
    appId: "1:905958098538:web:b2eae1e384d2c9b9cdac13",
    measurementId: "G-M4QEDG10FD"
  };

firebase.initializeApp(config);
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
