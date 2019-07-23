<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon
        v-if="loggedIn"
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      />
      <v-toolbar-title>Primire si Rugaciune</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="loggedIn" flat @click="onSignOut">SIGN OUT</v-btn>
        <v-btn v-else flat @click="$router.push('/login')">LOGIN</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-if="loggedIn"
      v-resize="onResize"
      app v-model="drawer"
      :permanent="permanent"
    >
      <v-list>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img :src="$auth().currentUser.photoURL">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ $auth().currentUser.displayName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile @click="$router.push('/me')">
          <v-list-tile-title>Profilul Meu</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push('/about')">
          <v-list-tile-title>Despre Departament</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push('/user-info')">
          <v-list-tile-title>Setari Cont</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      drawer: null,
      permanent: false,
      loggedIn: false,
    };
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

  methods: {
    onSignOut() {
      this.$auth().signOut();
    },
    onResize() {
      if (window.innerWidth > 960) {
        this.permanent = true;
        return;
      }
      this.permanent = false;
    },
  },
};
</script>
