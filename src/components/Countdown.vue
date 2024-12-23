<template>
  <v-card variant="tonal" class="main-card">
    {{ minutes1 }}{{ minutes2 }}:{{ seconds1 }}{{ seconds2 }}

    <v-btn
      v-if="isPlaying"
      @click="pause"
      icon="mdi-pause"
      variant="outlined"
      size="small"
      class="play-btn"
    ></v-btn>
    <v-btn
      v-else
      class="play-btn"
      @click="play"
      icon="mdi-play"
      variant="outlined"
      size="small"
    ></v-btn>
    <v-icon class="icon reset" icon="mdi-replay" @click="reset"></v-icon>
    <v-icon class="icon autorenew" icon="mdi-autorenew" @click="reset"></v-icon>
    <v-dialog max-width="400">
      <template v-slot:activator="{ props: activatorProps }">
        <v-icon
          v-bind="activatorProps"
          class="icon reactivate"
          icon="mdi-account-reactivate-outline"
          @click="reset"
        ></v-icon>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="EXIT?" color="#4bc0c0">

          <v-card-actions>
            <v-btn text="yes" @click="logout"></v-btn>
            <v-btn text="no" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from "vue";
// @ts-ignore
import { useTimeStore } from "@/stores/time";
// @ts-ignore
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth"; // Импортируем метод signOut

const timeStore = useTimeStore();

const minutes1 = ref<number>(2);
const minutes2 = ref<number>(5);
const seconds1 = ref<number>(0);
const seconds2 = ref<number>(0);

let startTime: number | null = null;
let elapsedTime = 0;

const isPlaying = ref<boolean>(false);
let timerInterval: ReturnType<typeof setInterval> | null = null;

async function play() {
  if (!startTime) {
    startTime = Date.now();
  }
  isPlaying.value = true;

  if (!timerInterval) {
    timerInterval = setInterval(() => {
      decrementTime();
    }, 1000);
  }
}

async function pause() {
  if (startTime) {
    elapsedTime += Math.floor((Date.now() - startTime) / 1000);
    startTime = null;
  }

  isPlaying.value = false;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  await syncWithFirebase();
}

async function reset(isTimeUp = false) {
  pause(); // Останавливаем таймер

  if (isTimeUp) {
    // Если время истекло, синхронизируем данные перед сбросом
    await syncWithFirebase();
  }

  // Сбрасываем значения таймера
  minutes1.value = 2;
  minutes2.value = 5;
  seconds1.value = 0;
  seconds2.value = 0;

  elapsedTime = 0; // Обнуляем локальное накопленное время
}

async function syncWithFirebase() {
  try {
    await timeStore.fetchToday();
    const serverToday = timeStore.today;

    await timeStore.updateToday(serverToday + elapsedTime);

    elapsedTime = 0;
  } catch (error) {
    console.error("Failed to sync with Firebase:", error);
  }
}

function decrementTime() {
  if (seconds2.value > 0) {
    seconds2.value--;
  } else if (seconds1.value > 0) {
    seconds1.value--;
    seconds2.value = 9;
  } else if (minutes2.value > 0) {
    minutes2.value--;
    seconds1.value = 5;
    seconds2.value = 9;
  } else if (minutes1.value > 0) {
    minutes1.value--;
    minutes2.value = 9;
    seconds1.value = 5;
    seconds2.value = 9;
  } else {
    reset(true);
  }
}

async function logout() {
  // Синхронизируем данные перед выходом
  await syncWithFirebase();

  // Выход из аккаунта
  try {
    await signOut(auth);
    console.log("User has logged out");
    // Можно добавить редирект или другое действие после выхода
  } catch (error) {
    console.error("Error logging out:", error);
  }
}

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  if (startTime) {
    elapsedTime += Math.floor((Date.now() - startTime) / 1000);
    syncWithFirebase();
  }
});
</script>


<style scoped>
.main-card {
  width: 100%;
  padding: 24px;
  font-size: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  .icon {
    color: rgba(75, 192, 192, 1);
    position: absolute;
    font-size: 16px;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    padding: 10px;
    &:hover {
      box-shadow: 0px 0px 11px -2px rgb(75, 192, 192);
    }
    &:active {
      box-shadow: 0px 0px 6px -2px rgba(75, 192, 192, 1);
    }
  }
  .reactivate {
    top: 10px;
    left: 10px;
  }
  .reset {
    left: 10px;
    top: 40px;
  }
  .autorenew {
    top: 70px;
    left: 10px;
  }

  .play-btn {
    color: rgba(75, 192, 192, 1);
  }
}
</style>
