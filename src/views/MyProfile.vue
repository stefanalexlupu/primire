<template>
<v-container :fill-height="loading">
  <v-layout v-if="loading" justify-center align-center>
    <v-progress-circular color="primary" size="100" indeterminate />
  </v-layout>
  <v-layout v-else column align-center py-4>
    <v-avatar class="mb-4" color="primary" :size="200">
      <img v-if="profilePicture" :src="profilePicture" :alt="userName">
      <span v-else class="initials">{{ initials }}</span>
    </v-avatar>
    <h2 class="font-weight-light">Bine ai venit,</h2>
    <h1 class="font-weight-regular">{{ userName }}</h1>

    <role :role="defaultRole" class="my-2"/>
    <!-- TODO: Status component (registration action, status) -->
    <!-- TODO: History component -->
  </v-layout>
</v-container>
</template>

<script>
import status from '../util/status';
import Role from '../components/Role.vue';

export default {
  components: { Role },
  data() {
    return {
      loading: true,
      userName: '',
      initials: '',
      history: [],
      status: '',
      activePosition: '',
      defaultRole: '',
      profilePicture: null,
    };
  },
  mounted() {
    const userDocRef = this.$firestore().doc(`/volunteers/${this.$auth().currentUser.uid}`);
    userDocRef.onSnapshot((snapshot) => {
      // update user interface with snapshot data
      const userData = snapshot.data();

      this.userName = userData.name;
      this.initials = this.userName.split(' ').map(token => token[0]).join('');
      this.history = userData.history;
      this.status = userData.status;
      if (userData.status === status.ACTIVE) {
        this.activePosition = userData.activeVolunteering;
      }
      if (userData.defaultRole) {
        this.defaultRole = userData.defaultRole;
      }

      if (userData.profilePictureUrl !== '') {
        this.profilePicture = userData.profilePictureUrl;
      }


      this.loading = false;
    }, (/* error */) => {
      // handle closed connection error
    });
  },
};
</script>

<style scoped>
.initials {
  font-size: 100px;
  color: white;
}
</style>
