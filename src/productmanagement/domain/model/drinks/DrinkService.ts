import { Drink } from "./Drink";
import { DrinkRepository } from "./DrinkRepository";

export class DrinkService {
  private _drinkRepository: DrinkRepository;

  constructor(drinkRepository: DrinkRepository) {
    this._drinkRepository = drinkRepository;
  }

  exists(aDrink: Drink): boolean {
    const drink: Drink | null = this._drinkRepository.findByName(aDrink);
    return drink !== null;
  }
}
