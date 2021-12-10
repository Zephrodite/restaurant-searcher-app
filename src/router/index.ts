import { createWebHistory, createRouter } from "vue-router";
import RestaurantsList from "@/components/RestaurantsList.vue";
import Searching from "@/components/Searching.vue";

const routes = [
  {
    path: "/" as string,
    name: "home" as string,
    component: Searching,
  },
  {
    path: "/restaurantslist" as string,
    name: "restaurantslist" as string,
    component: RestaurantsList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;