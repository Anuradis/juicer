import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddJuice from "../components/AddJuice.vue";
import EditJuice from "../components/EditJuice.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/addJuice",
    name: "AddJuice",
    component: AddJuice
  },
  {
    path: "/edit-juice/:juice_slug",
    name: "EditJuice",
    component: EditJuice
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
