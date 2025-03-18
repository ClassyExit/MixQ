import { createRouter, createWebHistory } from "vue-router";

// Import your views
import Home from "../views/Home.vue";

const routes = [{ path: "/", component: Home }];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
