export class MenuPrice {
  private _price: number;
  
  constructor(aPrice: number) {
    this.setPrice(aPrice);
  }

  private setPrice(aPrice: number) {
    if (aPrice === 0) throw new Error('price invalid');
    this._price = aPrice;
  }

  get price(): number {
    return this._price;
  }

  equals(aMenuPrice: MenuPrice): boolean {
    return this._price === aMenuPrice.price;
  }
}
