import { HelloRepository } from "@/domain/service/HelloRepository";
import { HelloModel } from "@/domain/model/HelloModel";
import store from "@/infrastructure/store";
import { SetHellos } from "@/infrastructure/store/hello/types";

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
    if (process.env.VUE_APP_USE_MOCK) mock.run(this.client);
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

  /** API request to create Hello */
  public async create(helloModel: HelloModel): Promise<HelloModel> {
    helloModel.id = this._uuid();
    await this.client.post("/hellos/hello", helloModel);
    return helloModel;
  }

  /** API request to update Hello */
  public async update(helloModel: HelloModel): Promise<void> {
    const id: string = helloModel.id;
    await this.client.put("/hellos/hello" + "/" + id, helloModel);
  }

  /** API request to delete Hello */
  public async delete(helloModel: HelloModel): Promise<void> {
    const id: string = helloModel.id;
    await this.client.delete("/hellos/hello" + "/" + id);
  }

  /**
   * Create UUID
   * However, best practice is to implement universality in the domain model.
   */
  private _uuid(c = 9999): string {
    const t = ((Date.now() + 12219292800000) * 1e4).toString(16);
    const n = crypto.getRandomValues(new Uint8Array(6)).reduce((sum, x, i) => {
      return sum + (i === 0 ? x | 1 : x).toString(16).padStart(2, "0");
    }, "");
    return `${t.slice(-8)}-${t.slice(-12, -8)}-1${t.slice(0, 3)}-${c}-${n}`;
  }
}
