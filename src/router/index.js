import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../layouts/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Index,
    children: [
      {
        path: "/",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
        meta: {
          title: "Home",
        },
      },
      {
        path: "/details",
        name: "details",
        component: () =>
          import(/* webpackChunkName: "details" */ "../views/Details.vue"),
        meta: {
          title: "Details",
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
