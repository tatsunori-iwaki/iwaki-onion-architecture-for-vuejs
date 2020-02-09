import RepositoryFactory from "@/infrastructure/configuration/RepositoryFactory";
import { HelloModel } from "@/domain/model/HelloModel";
import { HelloRepository } from "@/domain/service/HelloRepository";

describe("/infrastructure/repositories/HelloRepositoryImpl", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("repository - reads", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const helloRepository: HelloRepository = RepositoryFactory.helloRepository();
    const actual: Promise<HelloModel[]> = helloRepository.reads();
    const expected = Promise.resolve([]);
    expect((await actual).length).toBe((await expected).length);
  });

  it("repository - create", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const helloRepository: HelloRepository = RepositoryFactory.helloRepository();
    const helloModel: HelloModel = new HelloModel();
    const expected: Promise<HelloModel> = Promise.resolve(helloModel);
    const actual: Promise<HelloModel> = helloRepository.create(helloModel);
    expect(await actual).toBe(await expected);
  });

  it("repository - update", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const helloRepository: HelloRepository = RepositoryFactory.helloRepository();
    const helloModel: HelloModel = await helloRepository.create(
      new HelloModel()
    );
    helloRepository.update(helloModel);
  });

  it("repository - delete", async () => {
    process.env.NODE_ENV = "development";
    process.env.VUE_APP_USE_MOCK = true;
    const helloRepository: HelloRepository = RepositoryFactory.helloRepository();
    const helloModel: HelloModel = await helloRepository.create(
      new HelloModel()
    );
    helloRepository.delete(helloModel);
  });
});
