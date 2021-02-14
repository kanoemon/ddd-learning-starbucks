export class SaveDrinkUseCaseRequest {
  private _name: string;
  private _prices: {size: string, price: number}[] = [];

  constructor(name: string, prices: {size: string, price: number}[]) {
    this._name = name;
    this._prices = prices;
  }

  get name(): string {
    return this._name;
  }

  get prices(): {size: string, price: number}[] {
    return this._prices;
  }
}
