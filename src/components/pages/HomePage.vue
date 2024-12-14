<template>
  <main>
    <Countdown />
    <Statistics />
    <Chart/>
  </main>
</template>

<script setup lang="ts">
import Countdown from "../Countdown.vue";
import Statistics from "../Statistics.vue";
import Chart from "../Chart.vue";

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
