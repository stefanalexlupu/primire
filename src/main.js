import Vue from 'vue';
import './plugins/vuetify';
import './plugins/firebase';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

Vue.config.productionTip = false;

// TODO: Consider displaying a splash screen first.

// We want to only mount the app after firebase auth initializes.
let appWasMounted = false;

Vue.prototype.$auth().onAuthStateChanged(() => {
  if (!appWasMounted) {
    console.log('initializeApp');
    new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
    appWasMounted = true;
  }
});
