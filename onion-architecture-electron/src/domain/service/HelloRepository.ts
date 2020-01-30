import { HelloModel } from "@/domain/model/HelloModel";

/**
 * Define the operation rules of the domain layer model as an interface.
 * Implement this interface at the infrastructure layer.
 */
export interface HelloRepository {
  reads(): Promise<HelloModel[]>;
  create(helloModel: HelloModel): Promise<HelloModel>;
  update(helloModel: HelloModel): Promise<void>;
  delete(helloModel: HelloModel): Promise<void>;
}
