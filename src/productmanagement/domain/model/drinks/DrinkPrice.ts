import { MenuPrice } from "../MenuPrice";
import { DrinkSize } from "./";

export class DrinkPrice {
  private _drinkSize: DrinkSize;
  private _menuPrice: MenuPrice;

  constructor(aSize: DrinkSize, aMenuPrice: MenuPrice) {
    this._drinkSize = aSize;
    this._menuPrice = aMenuPrice;
  }

  get drinkSize(): DrinkSize {
    return this._drinkSize;
  }

  get menuPrice(): MenuPrice {
    return this._menuPrice;
  }

  equals(aDrinkPrice: DrinkPrice): boolean {
    return this._drinkSize.equals(aDrinkPrice.drinkSize)
            && this._menuPrice.equals(aDrinkPrice.menuPrice);
  }

  changePrice(aMenuPrice: MenuPrice): void {
    this._menuPrice = aMenuPrice;
  }
}
