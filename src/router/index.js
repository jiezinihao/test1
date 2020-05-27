import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue"
import SelfBook from "../views/selfBook.vue"

Vue.use(VueRouter);

const routes = [
  {
    path:"/",
    redirect:{name:'home'}
  },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path:"/login",
    name:"login",
    component:Login
  },
  {
    path:"/selfBook",
    name:"selfBook",
    component:SelfBook
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from,next) => {
  next()
})

export default router;
