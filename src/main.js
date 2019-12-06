import Vue from "vue";
import FastClick from "fastclick";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import waterfall from "vue-waterfall2";
import ToTop from "components/backToTop/BackToTop";
import Loading from "components/loading/Loading";

// 解决移动端点击延迟200ms的问题
if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

Vue.use(waterfall);

Vue.config.productionTip = false;

import "@/plugins";
import "@/config/rem";
import "@/config/filter";
import "reset-css";

//全局注册返回顶部
Vue.component("v-top", ToTop);
Vue.component("v-loading", Loading);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
