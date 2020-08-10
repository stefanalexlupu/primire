<template>
  <v-app light>
    <v-toolbar app dark color="primary" scroll-off-screen>
      <v-toolbar-side-icon
        v-if="loggedIn"
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      />
      <v-toolbar-title class="font-weight-light">Primire si Rugaciune</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-if="!loggedIn" flat @click="$router.push('/login')">LOGIN</v-btn>
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

        <v-list-tile @click="onSignOut" class="bottom">
          <v-icon class="mr-2">exit_to_app</v-icon>
          <v-list-tile-title>Log Out</v-list-tile-title>
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
  created() {
    this.$vuetify.theme.primary = '#ff8246';
    this.$vuetify.theme.secondary = '#f7931e';
    this.$vuetify.theme.success = '#a1dd70';
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

<style>
.application--wrap {
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffc60b+0,ef8956+100 */
  background: #ffc60b; /* Old browsers */
  background: -moz-linear-gradient(-45deg,  #ffc60b 0%, #ef8956 100%); /* FF3.6-15 */
  /* Chrome10-25,Safari5.1-6 */
  background: -webkit-linear-gradient(-45deg,  #ffc60b 0%,#ef8956 100%);
  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  background: linear-gradient(-45deg,  #ffc60b 0%,#ef8956 100%);


  color: #fdf7ee;
}

.bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
}
</style>
