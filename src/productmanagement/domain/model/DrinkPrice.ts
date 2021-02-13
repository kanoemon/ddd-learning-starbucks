import { MenuPrice } from "./MenuPrice";
import { Size } from "./Size";

export class DrinkPrice {
  private _size: Size;
  private _menuPrice: MenuPrice;

  constructor(aSize: Size, aMenuPrice: MenuPrice) {
    this._size = aSize;
    this._menuPrice = aMenuPrice;
  }

  get size(): Size {
    return this._size;
  }

  get menuPrice(): MenuPrice {
    return this._menuPrice;
  }

  equals(aDrinkPrice: DrinkPrice): boolean {
    return this._size === aDrinkPrice.size
            && this._menuPrice.equals(aDrinkPrice.menuPrice);
  }
}
