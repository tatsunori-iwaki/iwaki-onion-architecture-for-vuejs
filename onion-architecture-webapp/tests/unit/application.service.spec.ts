import HelloUseCase from "@/application/service/HelloUseCase";
import { HelloModel } from "@/domain/model/HelloModel";

describe("/application/service/HelloUseCase", () => {
  it("use case - reads", async () => {
    const expected = Promise.resolve([]);
    const helloUseCase = new HelloUseCase();
    jest
      .spyOn(helloUseCase.helloRepository, "reads")
      .mockImplementation(() => expected);
    const actual: Promise<HelloModel[]> = helloUseCase.reads();
    expect((await actual).length).toBe((await expected).length);
  });
  it("use case - create", async () => {
    const expected = Promise.resolve(new HelloModel());
    const helloUseCase = new HelloUseCase();
    jest
      .spyOn(helloUseCase.helloRepository, "create")
      .mockImplementation(() => expected);
    const actual = helloUseCase.create(new HelloModel());
    expect(await actual).toBe(await expected);
  });
  it("use case - update", async () => {
    const helloUseCase = new HelloUseCase();
    jest.spyOn(helloUseCase.helloRepository, "update").mockImplementation();
    helloUseCase.update(new HelloModel());
  });
  it("use case - delete", async () => {
    const helloUseCase = new HelloUseCase();
    jest.spyOn(helloUseCase.helloRepository, "delete").mockImplementation();
    helloUseCase.delete(new HelloModel());
  });
});
