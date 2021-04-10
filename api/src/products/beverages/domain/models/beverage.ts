import { BeverageId } from "./beverage-id";

export class Beverage {
  public readonly id: BeverageId;
  public readonly name: string;
  public readonly explanation: string;

  constructor(id: BeverageId, name: string, explanation: string) {
    this.id = id;
    this.name = name;
    this.explanation = explanation;
  }
}
