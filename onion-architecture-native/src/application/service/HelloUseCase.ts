import RepositoryFactory from "../../infrastructure/configuration/RepositoryFactory";
import { HelloRepository } from "../../domain/service/HelloRepository";
import { HelloModel } from "../../domain/model/HelloModel";

/**
 * Application layer implementation.
 * Mainly responsible for aggregating interfaces exposed by the domain layer.
 */
export default class HelloUseCase {
  public helloRepository: HelloRepository;

  /**
   * The repository instance is the image to be injected.
   * Creating an instance via a factory class.
   * This is because the onion architecture separates
   * the dependencies between the domain and infrastructure tiers.
   */
  constructor() {
    this.helloRepository = RepositoryFactory.helloRepository();
  }

  /** Reads Hello */
  public reads(): Promise<HelloModel[]> {
    return this.helloRepository.reads();
  }

  /** Create Hello */
  public create(helloModel: HelloModel): Promise<HelloModel> {
    return this.helloRepository.create(helloModel);
  }

  /** Update Hello */
  public update(helloModel: HelloModel) {
    this.helloRepository.update(helloModel);
  }

  /** Delete Hello */
  public delete(helloModel: HelloModel) {
    this.helloRepository.delete(helloModel);
  }
}
