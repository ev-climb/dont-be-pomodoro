import { createMemoryHistory, createRouter } from "vue-router";

const HomePage = () => import("@/components/pages/HomePage.vue");


const routes = [
  { path: "/", component: HomePage },

];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
