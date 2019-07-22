
import firebase from 'firebase/app';
import firebaseConfig from './firebaseConfig';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/messaging';

firebase.initializeApp(firebaseConfig);

export const { auth } = firebase;
export const { firestore } = firebase;

export const authInstance = firebase.auth();
