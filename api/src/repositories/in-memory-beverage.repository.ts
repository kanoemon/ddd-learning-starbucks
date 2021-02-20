import { Beverage, BeverageId } from "../domain/models/products/beverages";
import { BeverageRepository } from "../domain/models/products/beverages/beverage-repository";

export class InMemoryBeverageRepository implements BeverageRepository {
  async findById(aBeverageId: BeverageId): Promise<Beverage> {
    return new Beverage('coffee');
  }
}
