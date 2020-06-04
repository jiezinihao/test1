import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";
import Login from "../views/login.vue"
import SelfBook from "../views/selfBook.vue"
import BookSort from "../views/public/bookSort.vue"
import BookDetail from "../views/public/bookDetail"
import SelfHome from "../views/selfHome.vue"
import Catalogue from "../views/public/catalogue.vue"
import readBook from "../views/public/readBook.vue"
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
    path:"/bookSort:/sortId",
    name:"bookSort",
    component:BookSort
  },
  {
    path:"/bookDetail:/bookId",
    name:"bookDetail",
    component:BookDetail
  },
  {
    path:"/selfHome",
    name:"selfHome",
    component:SelfHome
  },
  {
    path:"/catalogue:/bookId",
    name:"catalogue",
    component:Catalogue
  },
  {
    path:"/readBook",
    name:"readBook",
    component:readBook
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
