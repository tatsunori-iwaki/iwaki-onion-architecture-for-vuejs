import Vue from "vue";
import Vuex from "vuex";

import * as hello from "@/infrastructure/store/hello";

Vue.use(Vuex);

/** Manage everything with the vuex store. */
export interface RootState {
  hello: hello.HelloState;
}

/** Map states to manage. */
export default new Vuex.Store<RootState>({
  modules: {
    hello: hello.store
  }
});
