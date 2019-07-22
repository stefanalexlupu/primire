<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          {{ name }}
        </h1>
        <p class="subheading font-weight-regular">
          {{ description }}
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
    };
  },
  mounted() {
    this.name = this.$firestore().collection('test').get().then((querySnapshot) => {
      if (querySnapshot.empty) {
        return;
      }
      querySnapshot.forEach((doc) => {
        this.name = doc.data().name;
        this.description = doc.data().description;
      });
    });
  },
};
</script>
