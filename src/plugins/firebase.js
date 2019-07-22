import Vue from 'vue';
import { auth, firestore } from '../firebase';

// Initialize Cloud Firestore through Firebase

Vue.prototype.$firestore = firestore;
Vue.prototype.$auth = auth;
