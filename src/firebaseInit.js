import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDk-Oux0Mu9Oq9I8FJrSLy0MgQ26gelNFw',
  authDomain: 'primire-web-app.firebaseapp.com',
  databaseURL: 'https://primire-web-app.firebaseio.com',
  projectId: 'primire-web-app',
  storageBucket: '',
  messagingSenderId: '728389655018',
  appId: '1:728389655018:web:6509d21902264ac2',
};

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase

export const db = firebase.firestore();
export const auth = firebase.auth();
