import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "@/App.vue";
import router from "@/presentation/router";
import store from "@/infrastructure/store";
import "@/registerServiceWorker";
import VueJsModal from "vue-js-modal";

Vue.config.productionTip = false;
Vue.use(VueCompositionApi);
Vue.use(ElementUI);
Vue.use(VueJsModal);

/**
 * Warning: The SetupContext.refs won't exist in Vue 3.0.
 * @vue/composition-api provide it as a workaround here.
 * You may also need to augment the SetupContext when working with TypeScript.
 */
declare module "@vue/composition-api/dist/component/component" {
  interface SetupContext {
    readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
