<template>
  <v-container>
    <v-layout v-if="loggedIn" column align-center>
      <h1 class="text-xs-center">Bine ai venit{{ ` ${displayName}` }}!</h1>
      <v-btn center @click="onSignOut">SIGN OUT</v-btn>
    </v-layout>
    <HelloWorld />
  </v-container>
</template>

<script>
import { auth } from '../firebaseInit';
import HelloWorld from '../components/HelloWorld.vue';

export default {
  components: {
    HelloWorld,
  },

  data() {
    return {
      loggedIn: auth.currentUser,
    };
  },

  computed: {
    displayName() {
      if (this.loggedIn) {
        return auth.currentUser.displayName;
      }

      return '';
    },
  },

  methods: {
    onSignOut() {
      auth.signOut();
    },
  },
};
</script>
