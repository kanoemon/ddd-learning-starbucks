import { ProductPrice } from "../product-price";
import { BeverageId } from "./beverage-id";
import { BeveragePrice } from "./beverage-price";
import { BeverageSize } from "./beverage-size";

export class Beverage {
  private _beverageId: BeverageId;
  private _name: string;
  private _explanation: string;
  private _beveragePrices: BeveragePrice[] = [];

  constructor(
    aBeverageId: BeverageId, 
    aName: string,
    aExplanation: string
  ) {
    this._beverageId = aBeverageId;
    this.setName(aName);
    this._explanation = aExplanation;
  }

  private setName(aName: string): void {
    this._name = aName;
  }

  get name(): string {
    return this._name;
  }

  get beverageId(): BeverageId {
    return this._beverageId;
  }

  get explanation(): string {
    return this._explanation;
  }

  get beveragePrices(): BeveragePrice[] {
    return this._beveragePrices;
  }

  addPrice(aSize: string, aPrice: number): void {
    this._beveragePrices.push(new BeveragePrice(
      new BeverageSize(aSize),
      new ProductPrice(aPrice)
    ));
  }

  priceofSize(aSize: string): BeveragePrice | null {
    const beverageSize: BeverageSize = new BeverageSize(aSize);
    const beveragePrices: BeveragePrice[] = this._beveragePrices.filter(beveragePrice =>
      beveragePrice.beverageSize.equals(beverageSize)
    );
    return beveragePrices.length > 0 ? beveragePrices[0] : null;
  }

  equals(aBeverage: Beverage): boolean {
    return aBeverage.beverageId.equals(this._beverageId);
  }
}
