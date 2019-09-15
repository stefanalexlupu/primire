<template>
<v-container :fill-height="loading">
  <v-layout v-if="loading" justify-center align-center>
    <v-progress-circular color="primary" size="100" indeterminate />
  </v-layout>
  <v-layout v-else column align-center py-4>
    <v-avatar class="mb-4" color="primary" :size="150">
      <img v-if="profilePicture" :src="profilePicture" :alt="volunteerName">
      <span v-else class="initials">{{ initials }}</span>
    </v-avatar>
    <h1 class="font-weight-medium">{{ volunteerName }}</h1>

    <role v-if="defaultRole" :role="defaultRole" class="my-2"/>

    <div class="content-card elevation-5 mt-3">


    <history v-if="history" :value="history" />
    </div>

  </v-layout>
</v-container>
</template>

<script>
import moment from 'moment';
import status from '../util/status';
import Role from '../components/Role.vue';
import History from '../components/History.vue';

export default {
  components: { Role, History },
  data() {
    return {
      registerDialog: false,
      unRegisterDialog: false,
      loading: true,
      volunteerName: '',
      initials: '',
      history: [],
      status: '',
      activePosition: '',
      defaultRole: '',
      profilePicture: null,
    };
  },
  computed: {
    activeColor() {
      return 'red';
    },
    thisSunday() {
      return moment().day(7);
    },
    isSunday() {
      return moment().day() === 0;
    },
  },
  mounted() {
    const userDocRef = this.$firestore().doc(`/volunteers/${this.$route.params.id}`);
    userDocRef.onSnapshot((snapshot) => {
      // update user interface with snapshot data
      const userData = snapshot.data();

      this.volunteerName = userData.name;
      this.initials = this.volunteerName.split(' ').map(token => token[0]).join('');
      this.history = userData.history;
      this.status = userData.status || status.NOT_REGISTERED;
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
  methods: {
    registerForServing() {
      this.$firestore()
        .doc(`volunteers/${this.$auth().currentUser.uid}`)
        .set({ status: status.REGISTERED }, { merge: true });
      this.registerDialog = false;
    },
    unRegisterFromServing() {
      this.$firestore()
        .doc(`volunteers/${this.$auth().currentUser.uid}`)
        .set({ status: status.NOT_REGISTERED }, { merge: true });
      this.unRegisterDialog = false;
    },
  },
};
</script>

<style scoped>
.v-avatar img {
  border: 3px solid white;
}

.initials {
  font-size: 100px;
  color: white;
}

.content-card {
  position: relative;
  background-color: #fffff0;
  width: 90%;
  border-radius: 10px;
  padding: 1em;
  text-align: center;
  color: #444444;
}
</style>
