import HelloUseCase from "@/application/service/HelloUseCase";
import { HelloModel } from "@/domain/model/HelloModel";

describe("/application/service/HelloUseCase test sample", () => {
  it("renders props.msg when passed", async () => {
    const expected = Promise.resolve([]);
    const helloUseCase = new HelloUseCase();
    jest
      .spyOn(helloUseCase.helloRepository, "reads")
      .mockImplementation(() => expected);
    const actual: Promise<HelloModel[]> = helloUseCase.reads();
    expect((await actual).length).toBe((await expected).length);
  });
});
