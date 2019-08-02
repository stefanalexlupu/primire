<template>
<v-container :fill-height="loading">
  <v-layout v-if="loading" justify-center align-center>
    <v-progress-circular color="primary" size="100" indeterminate />
  </v-layout>
  <v-layout v-else column align-center py-4>
    <v-avatar class="mb-4" color="primary" :size="150">
      <img v-if="profilePicture" :src="profilePicture" :alt="userName">
      <span v-else class="initials">{{ initials }}</span>
    </v-avatar>
    <h2 class="font-weight-regular">Bine ai venit,</h2>
    <h1 class="font-weight-medium">{{ userName }}</h1>

    <role v-if="defaultRole" :role="defaultRole" class="my-2"/>

    <div class="content-card elevation-5">
      <div v-if="status === 'not-registered' && !isSunday">
        <v-dialog v-model="registerDialog">
          <v-card>
            <v-card-text>
              Dorești să slujești cu echipa Duminică, {{ thisSunday.format('D MMMM') }}?
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" flat @click="registerDialog = false">Nu</v-btn>
              <v-btn color="primary" flat @click="registerForServing">Da</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <h2 class="font-weight-regular">Poți sluji Duminică?</h2>
        <v-btn color="primary" @click="registerDialog = true">DA!</v-btn>
      </div>

      <div v-if="status === 'registered' && !isSunday">
        <v-dialog v-model="unRegisterDialog">
          <v-card>
            <v-card-text>
              Nu mai ajungi Duminică?
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" flat @click="unRegisterDialog = false">Ba da</v-btn>
              <v-btn color="primary" flat @click="unRegisterFromServing">Nu</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-chip color="success" @click="unRegisterDialog = true">
          <v-avatar>
            <v-icon>check_circle</v-icon>
          </v-avatar>
          Ești înscris pentru Duminică
        </v-chip>
      </div>

      <div v-if="status === 'active'">
        <v-chip label outline :color="activeColor">
          {{ activePosition }}
        </v-chip>
      </div>

    <history :value="history" class="mt-2"/>
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
      userName: '',
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
      return moment().locale('ro').day(7);
    },
    isSunday() {
      return moment().day() === 7;
    },
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
  bottom: -40px;
  margin-top: -20px;
  background-color: #fffff0;
  width: 90%;
  min-height: 260px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 1em;
  text-align: center;
  color: #444444;
}
</style>
