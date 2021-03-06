import {model, property} from '@loopback/repository';

@model()
export class Price {
  @property({
    description: 'サイズ',
    type: 'string',
  })
  size: string;

  @property({
    description: '価格',
    type: 'number',
  })
  price: number;

  constructor(
    size: string,
    price: number
  ) {
    this.size = size;
    this.price = price;
  }
}

@model()
export class GetBeverageResponse {
  @property({
    description: 'ID',
    type: 'number'
  })
  id: number;

  @property({
    description: '名前',
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    description: '説明',
    type: 'string',
  })
  explanation: string;

  @property.array(Price)
  prices: Price[];

  constructor(
    id: number,
    name: string,
    explanation: string,
    prices: Price[]
  ) {
    this.id = id;
    this.name = name;
    this.explanation = explanation;
    this.prices = prices;
  }
}
