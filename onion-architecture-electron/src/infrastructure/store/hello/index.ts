import { Module } from "vuex";
import { RootState } from "@/infrastructure/store";
import { mutations } from "./mutations";
import { HelloState, initialState } from "./state";

export * from "./state";

/**
 * Define your own state of Hello.
 */
export const store: Module<HelloState, RootState> = {
  state: initialState,
  mutations
};
