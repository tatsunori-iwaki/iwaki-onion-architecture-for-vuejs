import { HelloRepository } from "../../domain/service/HelloRepository";
import { HelloModel } from "../../domain/model/HelloModel";

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
    return Promise.resolve([new HelloModel()])
  }
}
