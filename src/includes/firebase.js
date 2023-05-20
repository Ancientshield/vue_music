import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyARLgM-ccT1KjnVRRF53osLWBmj0P9V2i8',
  authDomain: 'music-2b578.firebaseapp.com',
  projectId: 'music-2b578',
  storageBucket: 'music-2b578.appspot.com',
  // Firebase comes with a feature to push notifications between applications instantly.
  // We won't be using this feature, but it is there if you need it.
  // messagingSenderId: '888586262714',
  appId: '1:888586262714:web:7e052c97efc26edb500a83',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

const usersCollection = db.collection('users');

export { auth, db, usersCollection, storage };
