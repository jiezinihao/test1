import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

//导入字体包
import './assets/font-awesome-4.7.0/css/font-awesome.min.css'


//引入elementUI
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

//导入自定义组件
import Search from "./public/search.vue"
import TopHeader from "./public/topHeader.vue"
Vue.component("topHeader",TopHeader);
Vue.component("search",Search)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
