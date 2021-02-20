export class BeverageSize {
  private _size: string;

  constructor(aSize: string) {
    this.setSize(aSize);
  }

  private setSize(aSize: string): void {
    if (aSize === 'short'
          || aSize === 'tall') {
      this._size = aSize;
      return;
    }
    throw new Error('size invalid');
  }

  get size(): string {
    return this._size;
  }

  equals(aBeverageSize: BeverageSize): boolean {
    return this._size === aBeverageSize.size;
  }
}
