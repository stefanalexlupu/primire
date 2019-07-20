import Vue from 'vue';
import firebase from 'firebase/app';
import firebaseConfig from '../firebaseConfig';
import 'firebase/firestore';
import 'firebase/messaging';
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase

Vue.prototype.$firestore = firebase.firestore;
Vue.prototype.$auth = firebase.auth;
