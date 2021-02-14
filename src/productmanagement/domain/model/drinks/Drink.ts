import { MenuPrice } from "../MenuPrice";
import { DrinkId } from "./DrinkId";
import { DrinkPrice } from "./DrinkPrice";
import { DrinkSize } from "./DrinkSize";

export class Drink {
  private _drinkId: DrinkId;
  private _name: string;
  private _drinkPrices: DrinkPrice[] = [];

  constructor(aDrinkId: DrinkId, aName: string) {
    this._drinkId = aDrinkId;
    this.setName(aName);
  }

  private setName(aName: string): void {
    if (aName === '') throw new Error('name empty');

    this._name = aName;
  }

  registerPrice(aDrinkSize: DrinkSize, aMenuPrice: MenuPrice): void {
    const drinkPrice: DrinkPrice | null = this.priceOfSize(aDrinkSize);
    if (drinkPrice === null) {
      this._drinkPrices.push(new DrinkPrice(aDrinkSize, aMenuPrice));
      return;
    }
    drinkPrice.changePrice(aMenuPrice);
  }

  private priceOfSize(aDrinkSize: DrinkSize): DrinkPrice | null {
    for (const drinkPrice of this._drinkPrices) {
      if (drinkPrice.drinkSize.equals(aDrinkSize)) return drinkPrice;
    }
    return null;
  }

  get drinkId(): DrinkId {
    return this._drinkId;
  }

  get name(): string {
    return this._name;
  }

  get drinkPrices(): DrinkPrice[] {
    return this._drinkPrices;
  }

  equals(aDrink: Drink): boolean {
    return this._drinkId.equals(aDrink.drinkId);
  }

  changeName(aName: string): void {
    this.setName(aName);
  }
}
