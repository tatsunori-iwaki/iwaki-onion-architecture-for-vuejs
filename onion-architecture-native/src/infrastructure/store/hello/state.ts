import { HelloModel } from "../../../domain/model/HelloModel";

/** Definition of what is saved in Hello state. */
export interface HelloState {
  helloModel: HelloModel;
  helloModels: HelloModel[];
}

/** Definition of initial value. */
export const initialState = (): HelloState => {
  return {
    helloModel: new HelloModel(),
    helloModels: []
  };
};
