import { HelloModel } from "../../../domain/model/HelloModel";

/** * vuex action interface. */
declare interface FluxStandardAction {
  readonly type: string;
  payload?: any;
}

/** Defines the type of SetHellos. */
export enum Types {
  SET_WORLDS = "hello/set_hellos"
}

/** When doing state commit, use SetHellos defined here. */
export class SetHellos implements FluxStandardAction {
  type = Types.SET_WORLDS;
  constructor(public payload: HelloModel[]) {}
}
