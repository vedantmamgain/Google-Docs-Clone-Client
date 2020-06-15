import Vue from "vue";
import VueRouter from "vue-router";
import App from "../App.vue";
import first from "../first.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/editor",
    name: "editor",
    component: App,
  },
  {
    path: "/",
    name: "home",
    component: first,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
