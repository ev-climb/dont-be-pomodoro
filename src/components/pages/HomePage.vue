<template>
  <main v-if="timeStore.userId">
    <Countdown />
    <Statistics />
    <Chart/>
  </main>
  <main v-else>
    <Register />
  </main>
</template>

<script setup lang="ts">
import { useTimeStore } from "../../stores/time"

import Countdown from "../Countdown.vue";
import Statistics from "../Statistics.vue";
import Chart from "../Chart.vue";
import Register from "../Register.vue";

const timeStore = useTimeStore();
console.log(timeStore.userId);


</script>

<style scoped>
main {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>
