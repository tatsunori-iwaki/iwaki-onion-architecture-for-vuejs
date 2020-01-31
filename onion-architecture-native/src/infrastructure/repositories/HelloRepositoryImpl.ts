import { HelloRepository } from "../../domain/service/HelloRepository";
import { HelloModel } from "../../domain/model/HelloModel";
import store from "../../infrastructure/store";
import { SetHellos } from "../../infrastructure/store/hello/types";

import axios from "axios";
import { AxiosInstance } from "axios";
import mock from "../../../mocks/api/hellos/hello";

/**
 * it's awesome!!
 * Since there are no dependencies in the domain layer,
 * the implementation content is API, database, or anything else.
 */
export default class HelloRepositoryImpl implements HelloRepository {
  private client: AxiosInstance;

  /** Set env and mock Axios Client */
  constructor() {
    this.client = axios.create({ baseURL: "http://localhost/v1" });
    mock.run(this.client);
  }

  /** API request to get Hello */
  public async reads(): Promise<HelloModel[]> {
    await this.client.get("/hellos/hello").then(res => {
      const models: HelloModel[] = res.data;
      store.commit(new SetHellos(models));
      return models;
    });
    return store.state.hello.helloModels;
  }
}
