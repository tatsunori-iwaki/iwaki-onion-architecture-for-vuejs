import MockAdapter from "axios-mock-adapter";
import Datastore from "nedb-promises";
import { HelloModel } from "../../../src/domain/model/HelloModel";

/**
 * axios and nedb mock.
 * This mock is activated by VUE_APP_USE_MOCK in .env.development.
 * Look at the implementation of HelloRepositoryImpl in the infrastructure layer.
 */
export default class hello {
  static basePath: string = "/hellos/hello";
  static db = new Datastore();

  static run(client: any) {
    const mock = new MockAdapter(client);
    mock.onGet(this.route(this.basePath)).reply(config => this.reads(config));
    mock.onPost(this.route(this.basePath)).reply(config => this.create(config));
    mock
      .onGet(this.route(this.basePath + "/" + ":helloId"))
      .reply(config => this.read(config));
    mock
      .onPut(this.route(this.basePath + "/" + ":helloId"))
      .reply(config => this.put(config));
    mock
      .onDelete(this.route(this.basePath + "/" + ":helloId"))
      .reply(config => this.delete(config));
  }

  static route(path = "") {
    return typeof path === "string"
      ? new RegExp(path.replace(/:\w+/g, "[^/]+"))
      : path;
  }

  static async reads(config: any) {
    const helloModel: HelloModel = new HelloModel();
    helloModel.id = 'sample';
    helloModel.message = 'hello world!!'
    await hello.db.insert(helloModel);

    const record = await this.db.find({});
    console.log('[DEBUG-MOCK]', record)
    return [200, record];
  }

  static async read(config: any) {
    const url: any = config.url;
    const helloId = await url.replace(this.basePath + "/", "");
    const record = await this.db.find({ id: helloId });
    return [200, record];
  }

  static async create(config: any) {
    const request = {
      ...JSON.parse(config.data),
      _id: JSON.parse(config.data).id
    };
    await this.db.insert(request);
    return [201];
  }

  static async put(config: any) {
    const url: any = config.url;
    const helloId = await url.replace(this.basePath + "/", "");
    const request = JSON.parse(config.data);
    await this.db.update({ id: helloId }, request);
    return [201];
  }

  static async delete(config: any) {
    const url: any = config.url;
    const helloId = await url.replace(this.basePath + "/", "");
    await this.db.remove({ id: helloId }, {});
    return [201];
  }
}
