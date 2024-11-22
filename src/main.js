import Vue from "vue";
import App from "./App.vue";
import xlmOfficeView from "../packages/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import xlmGantt from "../packages/index";

Vue.config.productionTip = false;

Vue.use(xlmOfficeView);
Vue.use(ElementUI)
Vue.use(xlmGantt)

new Vue({
  render: (h) => h(App),
}).$mount("#app");
