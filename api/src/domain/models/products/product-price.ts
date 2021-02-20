export class ProductPrice {
  private _price: number;

  constructor(aPrice: number) {
    this._price = aPrice;
  }

  get price(): number {
    return this._price;
  }
}
