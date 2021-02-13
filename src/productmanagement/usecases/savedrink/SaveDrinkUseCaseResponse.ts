export class SaveDrinkUseCaseResponse {
  private _id: number;
  private _name: string;
  private _size: string;

  constructor(id: number, name: string, size: string) {
    this._id = id;
    this._name = name;
    this._size = size;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get size(): string {
    return this._size;
  }
}
