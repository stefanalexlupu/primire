<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>Primire si Rugaciune</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer
      v-resize="onResize"
      app v-model="drawer"
      :permanent="permanent"
    >
      <v-list>
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MjM5ODg2MzUx/dwayne-johnson-11818916-1-402.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Dwaine Johnson</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>

        <v-list-tile @click="$router.push('/')">
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
    };
  },
  methods: {
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
