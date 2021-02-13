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

  setPrice(aSize: string, aPrice: number): void {
    const drinkSize: DrinkSize = new DrinkSize(aSize);
    const drinkPricesOfSize: DrinkPrice[] = this._drinkPrices.filter(drinkPrice =>
      drinkPrice.drinkSize.equals(drinkSize)
    );
    if (drinkPricesOfSize.length > 0) throw new Error('price already exists');

    const menuPrice: MenuPrice = new MenuPrice(aPrice);
    this._drinkPrices.push(new DrinkPrice(drinkSize, menuPrice));
  }

  get drinkId(): DrinkId {
    return this._drinkId;
  }

  get name(): string {
    return this._name;
  }

  get drinkPrices(): [] {
    return [];
  }

  equals(aDrink: Drink): boolean {
    return this._drinkId.equals(aDrink.drinkId);
  }
}
