<template>
  <div class="history">
    <div
      v-for="(item, index) in value"
      :key="index"
      class="role"
      :style="{ backgroundColor: roleColors.get(item)}"
    >
    </div>
  </div>
</template>

<script>
import { roleColors } from '../util/roles';

export default {
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      roleColors,
    };
  },
};
</script>

<style scoped>
.history {
  display: flex;
  flex-wrap: wrap;
  width: 220px;
  margin: 0 auto;
}
.role {
  width: 38px;
  height: 38px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid black;
  margin: 3px;
}
</style>
