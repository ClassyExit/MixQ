import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Host from "../views/Host.vue";
import Room from "../views/Room.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/host/:id", name: "Host", component: Host },
  { path: "/room/:id", name: "Room", component: Room },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
