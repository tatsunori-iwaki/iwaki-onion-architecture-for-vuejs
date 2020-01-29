import { MutationTree } from "vuex";
import { HelloState } from "./state";
import { Types, SetHellos } from "./types";

/**
 * Hello mutations
 */
export const mutations: MutationTree<HelloState> = {
  /** SetHellos is a rule for committing state. */
  [Types.SET_WORLDS]: (state, action: SetHellos) => {
    state.helloModels = action.payload;
  }
};
