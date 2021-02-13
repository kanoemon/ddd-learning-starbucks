export class DrinkSize {
  private _size: string;

  constructor(aSize: string) {
    this.setSize(aSize);
  }

  setSize(aSize: string) {
    if (aSize === 'short'
        || aSize === 'tall'
        || aSize === 'grande'
        || aSize === 'venti') {
      this._size = aSize;
      return;
    }
    throw new Error('size invalid');
  }

  get size(): string {
    return this._size;
  }

  equals(aDrinkSize: DrinkSize): boolean {
    return this._size === aDrinkSize.size;
  }
}
