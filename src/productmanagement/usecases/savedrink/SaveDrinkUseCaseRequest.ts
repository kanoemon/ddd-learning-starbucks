export class SaveDrinkUseCaseRequest {
  private _name: string;
  private _size: string;

  constructor(name: string, size: string) {
    this._name = name;
    this._size = size;
  }

  get name(): string {
    return this._name;
  }

  get size(): string {
    return this._size;
  }
}
