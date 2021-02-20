import { Beverage, BeverageId } from "../domain/models/products/beverages";
import { BeverageRepository } from "../domain/models/products/beverages/beverage-repository";

export class InMemoryBeverageRepository implements BeverageRepository {
  private _beverages: Beverage[] = [];

  async findById(aBeverageId: BeverageId): Promise<Beverage | null> {
    const beverages: Beverage[] = this._beverages.filter(beverage => 
      beverage.beverageId.equals(aBeverageId)
    );
    return beverages.length > 0 ? beverages[0] : null;
  }

  async save(aBeverage: Beverage): Promise<void> {
    this._beverages.push(aBeverage);
  }

  async nextIdentity(): Promise<BeverageId> {
    return new BeverageId(this._beverages.length + 1);
  }
}
