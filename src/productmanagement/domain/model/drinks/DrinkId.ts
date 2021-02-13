export class DrinkId {
  private _id: number;

  constructor(anId: number) {
    this._id = anId;
  }

  get id(): number {
    return this._id;
  }

  equals(anObject: DrinkId): boolean {
    return this._id === anObject.id; 
  }
}
