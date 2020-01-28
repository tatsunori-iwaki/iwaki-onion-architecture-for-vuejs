import { HelloRepository } from "@/domain/service/HelloRepository";
import HelloRepositoryImpl from "@/infrastructure/repositories/HelloRepositoryImpl";

/**
 * We recommend using a DI module.
 * But for ease of implementation we define it as a factory.
 */
export default class RepositoryFactory {
  /** Infrastructure layer is responsible for the connection */
  public static helloRepository(): HelloRepository {
    return new HelloRepositoryImpl();
  }
}
