<template>
  <v-container>
    <v-layout v-if="loggedIn" column align-center>
      <h1 class="text-xs-center">Bine ai venit{{ ` ${displayName}` }}!</h1>
    </v-layout>
    <HelloWorld />
  </v-container>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue';

export default {
  components: {
    HelloWorld,
  },

  data() {
    return {
      loggedIn: false,
    };
  },

  computed: {
    displayName() {
      if (this.loggedIn) {
        return this.$auth().currentUser.displayName;
      }

      return '';
    },
  },

  mounted() {
    this.$auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  },
};
</script>
