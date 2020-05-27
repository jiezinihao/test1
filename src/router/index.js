import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Login from "../views/login.vue"
import SelfBook from "../views/selfBook.vue"
import BookSort from "../views/public/bookSort.vue"

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
  },
  {
    path:"/bookSort/:sortId",
    name:"bookSort",
    component:BookSort
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
