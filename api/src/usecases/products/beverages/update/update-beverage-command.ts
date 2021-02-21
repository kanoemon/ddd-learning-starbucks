export class UpdateBeverageCommand {
  readonly id: number;
  name: string;
  explanation: string;
  priceOfShort: number;
  priceOfTall: number;

  constructor(id: number) {
    this.id = id;
  }
}
