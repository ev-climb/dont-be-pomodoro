<template>
  <v-card variant="tonal" class="main-card">
    <div class="row">
      <p>day</p>
      <span>
        {{ hoursToday }}<span class="unit">h</span> 
        {{ minutesToday }}<span class="unit">m</span>
      </span>
    </div>
    <div class="row">
      <p>week</p>
      <span>
        {{ hoursWeek }}<span class="unit">h</span> 
        {{ minutesWeek }}<span class="unit">m</span>
      </span>
    </div>
    <div class="row">
      <p>total</p>
      <span>
        {{ hoursTotal }}<span class="unit">h</span> 
        {{ minutesTotal }}<span class="unit">m</span>
      </span>
    </div>
  </v-card>
</template>

<script setup lang="ts">
// @ts-ignore
import { useTimeStore } from "@/stores/time";
import { computed } from "vue";

const timeStore = useTimeStore();

const week = computed(() => {
  let seconds = 0;
  timeStore.days.forEach((obj: { value: number }, i: number) => {
    if (i < 7) {
      seconds += obj.value;
    }
  });
  return seconds;
});

const total = computed(() => {
  let seconds = 0;
  timeStore.days.forEach((obj: { value: number }) => {
    seconds += obj.value;
  });
  return seconds;
});

// Вычисляем часы и минуты для разных значений
const hoursToday = computed(() => Math.floor(timeStore.today / 3600));
const minutesToday = computed(() =>
  Math.floor((timeStore.today % 3600) / 60).toString().padStart(2, "0")
);

const hoursWeek = computed(() => Math.floor(week.value / 3600));
const minutesWeek = computed(() =>
  Math.floor((week.value % 3600) / 60).toString().padStart(2, "0")
);

const hoursTotal = computed(() => Math.floor(total.value / 3600));
const minutesTotal = computed(() =>
  Math.floor((total.value % 3600) / 60).toString().padStart(2, "0")
);

// Загружаем данные today при монтировании
timeStore.fetchToday();
</script>

<style scoped>
.main-card {
  width: 100%;
  padding: 24px;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  .row {
    width: 60%;
    display: flex;
    justify-content: space-between;
  }
  .unit {
    font-size: 20px; /* Уменьшенный размер шрифта */
    color: rgba(75, 192, 192, 1); /* Серый цвет */
  }
}
</style>
