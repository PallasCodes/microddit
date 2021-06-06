import { createRouter, createWebHistory } from "vue-router";
import Feed from "../views/Feed.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import store from '../store'

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