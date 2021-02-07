export class DrinkId {
  private _id: number;

  constructor(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  equals(anObject: DrinkId): boolean {
    return this._id === anObject.id; 
  }
}
