export class Up2dateBeverageCommand {
  readonly id: number;
  name: string;
  explanation: string;
  priceOfShort: number;
  priceOfTall: number;

  constructor(id: number) {
    this.id = id;
  }
}

export interface UpdateBeverageCommand {
  id: number,
  name: string,
  explanation: string,
  priceOfShort: number,
  priceOfTall: number
}
