export class SaveDrinkUseCaseRequest {
  private _name: string;
  private _size: string;
  private _prices: {[s: string]: number};

  constructor(name: string, size: string, prices: {[s: string]: number}) {
    this._name = name;
    this._size = size;
  }

  get name(): string {
    return this._name;
  }

  get size(): string {
    return this._size;
  }

  get prices(): {[s: string]: number} {
    return this._prices;
  }
}
