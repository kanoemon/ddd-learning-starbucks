import { Beverage, BeverageId } from "./domain/models";

export class BeveragesRepository {
  async findById(beverageId: BeverageId): Promise<Beverage> {
    return new Beverage('coffee', 'hogehoge');
  }
}
