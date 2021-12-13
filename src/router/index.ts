import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    alias: "/",
    name: "searchresults-new",
    component: () => import("@/components/Searching.vue"),
  },
  {
    path: "/",
    alias: "/restaurantslist/:id",
    name: "restaurantslist",
    component: () => import("@/components/RestaurantsList.vue"),
  },
  {
    path: "/",
    alias: "/restaurantslist/sw/:id",
    name: "restaurantslistsw",
    component: () => import("@/components/RestaurantsListSwitch.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
