<template>
  <v-container>
    <v-layout>
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
      volunteers: [{ name: 'Alex Lupu', profilePictureUrl: 'https://timedotcom.files.wordpress.com/2014/09/macaca_nigra_self-portrait_rotated_and_cropped.jpg?quality=85&w=180', volunteerId: 'assd234edf2wdfs-1dvsx1-vdcqs1' }],
    };
  },
};
</script>

<style>

</style>
