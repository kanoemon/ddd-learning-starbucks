import { Beverage } from "./beverage";
import { BeverageId } from "./beverage-id";

export interface BeverageRepository {
  findById(aBeverageId: BeverageId): Promise<Beverage | null>;
  save(aBeverage: Beverage): Promise<void>;
}
