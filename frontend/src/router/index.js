import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/sign-up",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "sign" */ "../views/SignView.vue"),
    children: [
      {
        name: "signup1",
        path: "",
        component: () =>
          import(
            /* webpackChunkName: "sign1" */ "../views/SignViews/SignView1.vue"
          ),
        meta: {
          index: 1,
        },
      },
      {
        name: "signup2",
        path: "more-about-you",
        component: () =>
          import(
            /* webpackChunkName: "sign2" */ "../views/SignViews/SignView2.vue"
          ),
        meta: {
          index: 2,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
