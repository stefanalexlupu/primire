import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

import { authInstance, firestore } from './firebase';

const requireAuth = (to, from, next) => {
  if (!authInstance.currentUser) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }
  return next();
};

const requireGuest = (to, from, next) => {
  if (authInstance.currentUser) {
    return next({ path: '/' });
  }
  return next();
};

const requireAdmin = async (to, from, next) => {
  if (!authInstance.currentUser) {
    return next({ path: '/login', query: { redirect: to.fullPath } });
  }
  const volunteerReference = firestore().collection('volunteers').doc(authInstance.currentUser.uid);

  // Make sure we have something
  if (!volunteerReference) {
    return next({ path: '/user-info', query: { redirect: to.fullPath } });
  }
  const volunteerSnapshot = await volunteerReference.get();

  if (!volunteerSnapshot.data().isAdmin) {
    return next({ path: '/access-denied' });
  }

  return next();
};

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      beforeEnter: requireAdmin,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/auth/Login.vue'),
      beforeEnter: requireGuest,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/auth/Register.vue'),
      beforeEnter: requireGuest,
    },
    {
      path: '/user-info',
      name: 'user-info',
      component: () => import('./views/UserInfo.vue'),
      beforeEnter: requireAuth,
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('./views/Team.vue'),
      beforeEnter: requireAdmin,
    },
    {
      path: '/team/:id',
      name: 'team-id',
      component: () => import('./views/VolunteerProfile'),
      beforeEnter: requireAdmin,
    },
    {
      path: '/me',
      name: 'my-profile',
      component: () => import('./views/MyProfile.vue'),
      beforeEnter: requireAuth,
    },
  ],
});
