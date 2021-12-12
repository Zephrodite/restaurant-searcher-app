import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    alias: "/searchresults/new",
    name: "searchresults-new",
    component: () => import("@/components/Searching.vue"),
  },
  {
    path: "/",
    alias: "/restaurantslist/:id",
    name: "restaurantslist",
    component: () => import("@/components/RestaurantsList.vue"),
  },
];

console.log(process.env.BASE_URL);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
