import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase

export const db = firebase.firestore();
export const auth = firebase.auth();
