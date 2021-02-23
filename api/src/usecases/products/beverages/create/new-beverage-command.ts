export interface NewBeveragePrice {
  size: string;
  price: number;
}

export interface NewBeverageCommand {
  name: string;
  explanation: string;
  prices: NewBeveragePrice[];
}
