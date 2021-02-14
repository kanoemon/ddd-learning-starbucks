export class UpdateDrinkUseCaseRequest {
  private _id: number;
  private _name: string;
  private _prices: {size: string, price: number}[];

  constructor(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  setName(aName: string): void {
    this._name = aName;
  }

  get prices(): {size: string, price: number}[] {
    return this._prices;
  }

  setPrices(aPrices: {size: string, price: number}[]): void {
    this._prices = aPrices;
  }
}
