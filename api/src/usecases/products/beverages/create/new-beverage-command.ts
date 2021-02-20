export class NewBeverageCommand {
  readonly name: string;
  readonly explanation: string;
  readonly prices: {size: string, price: number}[];

  constructor(
    name: string,
    explanation: string,
    prices: {size: string, price: number}[]
  ) {
    this.name = name;
    this.explanation = explanation;
    this.prices = prices;
  }
}
