export class BeverageId {
  private _id: number;

  constructor(aId: number) {
    this._id = aId;
  }

  get id(): number {
    return this._id;
  }

  equals(aBeverageId: BeverageId): boolean {
    return aBeverageId.id === this._id;
  }
}
