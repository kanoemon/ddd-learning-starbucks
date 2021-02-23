import {BeverageSize} from './beverage-size';
import {ProductPrice} from '../product-price';

export class BeveragePrice {
  constructor(
    private _beverageSize: BeverageSize,
    private _productPrice: ProductPrice,
  ) {}

  get beverageSize(): BeverageSize {
    return this._beverageSize;
  }

  get productPrice(): ProductPrice {
    return this._productPrice;
  }

  changePrice(aPrice: number): void {
    this._productPrice = new ProductPrice(aPrice);
  }

  equals(aBeverage: BeverageSize): boolean {
    return this._beverageSize.equals(aBeverage);
  }
}
