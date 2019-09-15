<template>
  <v-container>
    <v-layout v-if="volunteers.length">
      <v-flex xs6 sm4 md2 v-for="volunteer in volunteers" :key="volunteer.id">
        <volunteer-card :value="volunteer"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VolunteerCard from '../components/VolunteerCard.vue';

export default {
  components: { VolunteerCard },
  data() {
    return {
      volunteers: [],
    };
  },

  mounted() {
    const userDocRef = this.$firestore().doc('/team/volunteers');
    userDocRef.onSnapshot((snapshot) => {
      // update user interface with snapshot data
      const teamData = snapshot.data();
      this.volunteers = teamData.volunteers;
      console.info(teamData.volunteers);
      this.loading = false;
    }, (/* error */) => {
      // handle closed connection error
    });
  },
};
</script>

<style>

</style>
