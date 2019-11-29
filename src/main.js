import Vue from "vue";
import Fastclick from "fastclick";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import waterfall from "vue-waterfall2";

Vue.use(waterfall);
//解决移动端延迟300ms的问题
if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      Fastclick.attach(document.body);
    },
    false
  );
}

Vue.config.productionTip = false;

import "@/plugins";
import "@/config/rem";
import "reset-css";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
