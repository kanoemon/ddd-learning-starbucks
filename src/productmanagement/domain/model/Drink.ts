import { DrinkId } from "./DrinkId";

export class Drink {
  private _drinkId: DrinkId;
  private _name: string;

  constructor(drinkId: DrinkId, name: string) {
    this._drinkId = drinkId;
    this.setName(name);
  }

  get drinkId(): DrinkId {
    return this._drinkId;
  }

  get name(): string {
    return this._name;
  }

  private setName(aname: string) {
    if (aname === '') {
      throw new Error('name empty');
    }
    this._name = aname;
  }

  equals(anObject: Drink): boolean {
    return this._drinkId.equals(anObject.drinkId);
  }
}
