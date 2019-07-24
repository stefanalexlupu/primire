<template>
<v-container :fill-height="loading">
  <v-layout v-if="loading" justify-center align-center>
    <v-progress-circular color="primary" size="100" indeterminate />
  </v-layout>
  <v-layout v-else column align-center>
    <!-- TODO: Remove the following content: -->
    <div>
      <p>User name: {{userName}}</p>
      <p>Profile pic:</p>
      <img :src="profilePicture" alt="profile picture">
      <p>Default role: {{defaultRole}}</p>
      <p>Status: {{status}}</p>
      <p>Active position: {{activePosition}}</p>
      <p>History: {{history}}</p>
    </div>

    <!-- TODO: Profile Picture and Name and default role component -->
    <!-- TODO: Status component (registration action, status) -->
    <!-- TODO: History component -->
  </v-layout>
</v-container>
</template>

<script>
import status from '../util/status';

export default {
  data() {
    return {
      loading: true,
      userName: '',
      history: [],
      status: '',
      activePosition: '',
      defaultRole: '',
      profilePicture: '',
    };
  },
  mounted() {
    const userDocRef = this.$firestore().doc(`/volunteers/${this.$auth().currentUser.uid}`);
    userDocRef.onSnapshot((snapshot) => {
      // update user interface with snapshot data
      const userData = snapshot.data();

      this.userName = userData.name;
      this.history = userData.history;
      this.status = userData.status;
      if (userData.status === status.ACTIVE) {
        this.activePosition = userData.activeVolunteering;
      }
      if (userData.defaultRole) {
        this.defaultRole = userData.defaultRole;
      }

      this.profilePicture = userData.profilePictureUrl;

      this.loading = false;
    }, (/* error */) => {
      // handle closed connection error
    });
  },
};
</script>
