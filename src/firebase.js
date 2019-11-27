import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// Basic firebase configuration linking web application to database - see firebase documentation
var firebaseConfig = {
  apiKey: "AIzaSyCfuyjwiorlnmVQTvy_npRWc4r7pv2pX3U",
  authDomain: "calendar-f1deb.firebaseapp.com",
  databaseURL: "https://calendar-f1deb.firebaseio.com",
  projectId: "calendar-f1deb",
  storageBucket: "calendar-f1deb.appspot.com",
  messagingSenderId: "961769119540",
  appId: "1:961769119540:web:6b9a08b28873d0eda98f61",
  measurementId: "G-ZT3V2273PC"
};

// Initialising firebase
firebase.initializeApp(firebaseConfig);

// Exporting connection to provider for google signin
export const provider = new firebase.auth.GoogleAuthProvider();

// Exporting connection to database as a variable
export const firestore = firebase.firestore();

export default firebase;
