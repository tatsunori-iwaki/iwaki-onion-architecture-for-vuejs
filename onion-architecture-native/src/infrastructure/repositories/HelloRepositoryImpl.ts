import { HelloRepository } from "../../domain/service/HelloRepository";
import { HelloModel } from "../../domain/model/HelloModel";
import store from "../../infrastructure/store";
import { SetHellos } from "../../infrastructure/store/hello/types";

/**
 * it's awesome!!
 * Since there are no dependencies in the domain layer,
 * the implementation content is API, database, or anything else.
 */
export default class HelloRepositoryImpl implements HelloRepository {

  /** Set env and mock Axios Client */
  constructor() {
  }

  /** API request to get Hello */
  public reads(): Promise<HelloModel[]> {
    return Promise.resolve(this.sample())
  }

  private sample(): HelloModel[] {
    const models: HelloModel[] = [];
    const helloModel:HelloModel = new HelloModel();
    helloModel.id = 'sample';
    models.push(helloModel)
    store.commit(new SetHellos(models));
    return store.state.hello.helloModels
  }
}
