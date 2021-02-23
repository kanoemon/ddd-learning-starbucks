export class BeverageSize {
  constructor(private _size: string) {
    this.setSize(_size);
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
