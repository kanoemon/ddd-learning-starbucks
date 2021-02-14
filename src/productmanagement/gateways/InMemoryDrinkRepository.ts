import { DrinkRepository, DrinkId, Drink } from "../domain/model/drinks";

export class InMemoryDrinkRepository implements DrinkRepository {
  private _drinks: Drink[] = [];

  findById(aDrinkId: DrinkId): Drink | null {
    const drinks = this._drinks.filter(drink => drink.drinkId.id === aDrinkId.id);
    return drinks.length > 0 ? drinks[0] : null;
  }

  findByName(aDrink: Drink): Drink | null {
    const drinks = this._drinks.filter(drink => drink.name === aDrink.name);
    return drinks.length > 0 ? drinks[0] : null;
  }

  save(aDrink: Drink): void {
    this._drinks.push(aDrink);
  }

  nextIdentity(): DrinkId {
    return new DrinkId(this._drinks.length + 1);
  }
}
