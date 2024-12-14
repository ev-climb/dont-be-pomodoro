<template>
  <v-card variant="tonal" class="main-card">
    <Line v-if="chartReady" id="line-chart" :options="chartOptions" :data="chartData" />
    <div v-else>Загрузка данных...</div>
  </v-card>
</template>

<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { ref, watch, reactive } from "vue";
import { useTimeStore } from "@/stores/time";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "LineChart",
  components: { Line },
  setup() {
    const timeStore = useTimeStore();

    // Флаг готовности графика
    const chartReady = ref(false);

    // Инициализация данных для графика
    const chartData = reactive({
      labels: [],
      datasets: [
        {
          label: "Time Spent (seconds)",
          data: [],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          pointBackgroundColor: "rgba(75, 192, 192, 1)",
          pointBorderColor: "#fff",
          tension: 0.4,
        },
      ],
    });

    // Опции графика
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => formatTime(tooltipItem.raw),
          },
        },
      },
      scales: {
        x: {
          ticks: {
            callback: (_, index) => formatDate(chartData.labels[index]),
            color: "rgba(255, 255, 255, 1)", // Цвет текста для оси X
          },
        },
        y: {
          ticks: {
            display: false,
            color: "rgba(255, 255, 255, 1)",
            callback: (value) => formatTime(value),
          },
        },
      },
    };

    // Наблюдение за изменением days
    watch(
      () => timeStore.days,
      (newDays) => {
        if (newDays.length) {
          // Обновление данных графика
          chartData.labels = newDays.map((day) => day.day).reverse();
          chartData.datasets[0].data = newDays.map((day) => day.value).reverse();
          chartReady.value = true; // Данные загружены
        }
      },
    );

    // Загружаем данные при монтировании
    timeStore.fetchToday();

    function formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours.toString()}h ${minutes
        .toString()
        .padStart(2, "0")}m`;
    }

    function formatDate(dateString) {
      const [year, month, day] = dateString.split("-");
      return `${day}.${month}`; // Преобразуем в формат дд.мм
    }

    return {
      chartData,
      chartOptions,
      chartReady,
    };
  },
};
</script>

<style scoped>
.main-card {
  width: 100%;
  padding: 24px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
