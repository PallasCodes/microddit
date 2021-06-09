import { createRouter, createWebHistory } from "vue-router";
import store from '../store'

import Feed from "../views/Feed.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Communities from "../views/Communities.vue";
import Communitie from "../views/Communitie.vue";

const routes = [{
    path: "/",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      logedOutRequired: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      logedOutRequired: true
    }
  },
  {
    path: "/communities",
    name: "Communities",
    component: Communities,
  },
  {
    path: "/communitie/:category/:communitie",
    name: "Communitie",
    component: Communitie,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.logedOutRequired) && store.getters.isAuthenticated) {
    next({ name: 'Feed' })
  } else {
    next()
  }
})

export default router;