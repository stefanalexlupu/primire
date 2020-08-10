<template>
  <v-card class="role" :color="color" :elevation="5">
    <p>
      {{ role.toUpperCase() }}
    </p>
  </v-card>
</template>

<script>
import { roleColors } from '../util/roles';

export default {
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  computed: {
    color() {
      return roleColors.get(this.role);
    },
  },
};
</script>

<style scoped>
.role {
  height: 30px;
  padding: 0.3em 1.7em;
  border-radius: 25px;
}

.role p {
  margin: 0;
  color: white;
  font-weight: bold;
  letter-spacing: 0.05em;
}
</style>
