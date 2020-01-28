import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "@/App.vue";
import router from "@/presentation/router";
import store from "@/infrastructure/store";
import "@/registerServiceWorker";
import VueJsModal from "vue-js-modal";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueJsModal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
