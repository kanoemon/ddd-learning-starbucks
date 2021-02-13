import { DrinkId } from "./DrinkId";
import { DrinkPrice } from "./DrinkPrice";
import { MenuPrice } from "./MenuPrice";
import type { Size } from "./Size";

export class Drink {
  private _drinkId: DrinkId;
  private _name: string;
  private _size: Size;
  private _drinkPrices: DrinkPrice[];

  constructor(drinkId: DrinkId, name: string, size: string) {
    this._drinkId = drinkId;
    this.setSize(size);
    this.setName(name);
  }

  get drinkId(): DrinkId {
    return this._drinkId;
  }

  get name(): string {
    return this._name;
  }

  get size(): Size {
    return this._size;
  }

  get drinkPrices(): DrinkPrice[] {
    return this._drinkPrices;
  }

  setPrice(aSize: string, aPrice: number) {
    if (aSize !== 'short'
          && aSize !== 'tall'
          && aSize !== 'grande'
          && aSize !== 'venti') {
      throw new Error('size invalid');
    }
    const drinkPrice = new DrinkPrice(aSize, new MenuPrice(aPrice));
    this._drinkPrices.push(drinkPrice);
  }

  private setName(aname: string) {
    if (aname === '') {
      throw new Error('name empty');
    }
    this._name = aname;
  }

  private setSize(aSize: string) {
    if (aSize !== 'short'
          && aSize !== 'tall'
          && aSize !== 'grande'
          && aSize !== 'venti') {
      throw new Error('size invalid');
    }
    this._size = aSize;

  }

  equals(anObject: Drink): boolean {
    return this._drinkId.equals(anObject.drinkId);
  }

  changeName(aName: string) {
    this.setName(aName);
  }
}
