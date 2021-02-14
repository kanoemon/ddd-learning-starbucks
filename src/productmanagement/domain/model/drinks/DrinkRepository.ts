import { Drink } from "./Drink";
import { DrinkId } from "./DrinkId";

export interface DrinkRepository {
  findById(id: DrinkId): Drink | null;
  findByName(drink: Drink): Drink | null;
  save(drink: Drink): void;
  nextIdentity(): DrinkId;
}
