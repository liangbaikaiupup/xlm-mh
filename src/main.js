import Vue from "vue";
import App from "./App.vue";
import xlmOfficeView from "../packages/index";
import xlmGantt from "../packages/index";

Vue.config.productionTip = false;

Vue.use(xlmOfficeView);
Vue.use(xlmGantt);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
