<template>
  <v-card class="volunteer-card pa-4" @click.stop="$router.push('/team/' + value.volunteerId)">
    <v-avatar size="82px">
      <img :src="value.profilePictureUrl" :alt="value.name">
    </v-avatar>
      <h1 class="title mt-2">{{ value.name }}</h1>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="css" scoped>
.volunteer-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
