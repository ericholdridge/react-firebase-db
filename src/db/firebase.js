import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyArzpzZ8Jp8tcKIfTBUPJbl_cQVCD4utkg",
  authDomain: "react-firebase-db-6d102.firebaseapp.com",
  databaseURL: "https://react-firebase-db-6d102.firebaseio.com",
  projectId: "react-firebase-db-6d102",
  storageBucket: "react-firebase-db-6d102.appspot.com",
  messagingSenderId: "836905517842",
  appId: "1:836905517842:web:90351ae0fdcb4731aca9cb",
  measurementId: "G-2S1BHRQCB7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;