export class GetDrinkDetailUseCaseResponse {
  private _id: number;
  private _name: string;
  private _prices: {size: string, price: number}[];

  constructor(id: number, name: string, prices: {size: string, price: number}[]) {
    this._id = id;
    this._name = name;
    this._prices = prices;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get prices(): {size: string, price: number}[] {
    return this._prices;
  }
}
