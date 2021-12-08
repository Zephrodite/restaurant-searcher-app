import { createWebHistory, createRouter } from "vue-router";
import RestaurantsList from "@/components/RestaurantsList.vue";
import Searching from "@/components/Searching.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Searching,
  },
  {
    path: "/restaurantslist",
    name: "restaurantslist",
    component: RestaurantsList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;