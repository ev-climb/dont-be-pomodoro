import { defineStore } from "pinia";
import { ref } from "vue";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
// @ts-ignore: Unreachable code error
import { db, auth } from "@/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export const useTimeStore = defineStore("time", () => {
  const today = ref<number>(0);
  const days = ref<[]>([]); // Хранилище для week
  const lastUpdated = ref<string>("");
  const userId = ref<string | null>(null);

  // Устанавливаем `userId` при изменении состояния авторизации
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userId.value = user.uid;
      console.log("User authenticated:", user.uid);
    } else {
      userId.value = null;
      console.log("User is not authenticated.");
    }
  });

  // Метод для получения today из Firebase
  const fetchToday = async () => {
    if (!userId.value) {
      console.error("User is not authenticated. Cannot fetch today data.");
      return;
    }

    try {
      const docRef = doc(db, "users", userId.value, "time", "today");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const serverDate = data.lastUpdated || ""; // Дата последнего обновления в Firebase
        const currentDate = getCurrentDate();

        // Проверяем, если день изменился, обнуляем today
        if (serverDate !== currentDate) {
          await resetToday(); // Обнуляем today
        } else {
          today.value = data.time[0]?.value || 0; // Загружаем значение today
          days.value = data.time;
        }

        lastUpdated.value = currentDate;
      } else {
        console.error("Document not found");
      }
    } catch (error) {
      console.error("Error fetching today:", error);
    }
  };

  // Метод для обновления today в Firebase
  const updateToday = async (newTime: number) => {
    if (!userId.value) {
      console.error("User is not authenticated. Cannot update today data.");
      return;
    }

    try {
      const docRef = doc(db, "users", userId.value, "time", "today");
      const currentDate = getCurrentDate();

      // Получаем текущие данные документа
      const docSnapshot = await getDoc(docRef);
      let timeArray = [];

      if (docSnapshot.exists()) {
        // Если документ существует, извлекаем массив time
        timeArray = docSnapshot.data().time || [];
      }

      // Обновляем значение time[0].value или добавляем объект, если массив пуст
      if (timeArray.length > 0) {
        timeArray[0].value = newTime;
        days.value = timeArray;
      } else {
        timeArray.push({ value: newTime, day: currentDate });
        days.value = timeArray;
      }

      // Обновляем документ в Firebase
      await updateDoc(docRef, { time: timeArray, lastUpdated: currentDate });

      // Синхронизируем локальные значения
      today.value = timeArray[0]?.value || newTime;
      lastUpdated.value = currentDate;
    } catch (error) {
      console.error("Error updating today:", error);
    }
  };

  // Метод для сброса today
  const resetToday = async () => {
    if (!userId.value) {
      console.error("User is not authenticated. Cannot reset today data.");
      return;
    }

    try {
      const docRef = doc(db, "users", userId.value, "time", "today");
      const currentDate = getCurrentDate();

      // Получаем текущие данные документа
      const docSnapshot = await getDoc(docRef);
      let timeArray = [];

      if (docSnapshot.exists()) {
        // Если документ существует, извлекаем массив time
        timeArray = docSnapshot.data().time || [];
      }

      // Добавляем новый объект в массив
      timeArray.unshift({ value: 0, day: currentDate });

      // Обновляем документ
      await setDoc(docRef, { time: timeArray, lastUpdated: currentDate });

      today.value = timeArray[0].value;
      lastUpdated.value = currentDate;
      days.value = timeArray;
    } catch (error) {
      console.error("Error resetting today:", error);
    }
  };

  // Получение текущей даты в формате YYYY-MM-DD
  const getCurrentDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    today,
    days,
    fetchToday,
    updateToday,
    resetToday,
    userId,
  };
});
