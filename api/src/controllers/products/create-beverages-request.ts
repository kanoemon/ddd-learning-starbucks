import {model, property} from '@loopback/repository';

export namespace CreateBeveragesRequest {
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

    constructor(size: string, price: number) {
      this.size = size;
      this.price = price;
    }
  }

  @model()
  export class Beverage {
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

    constructor(name: string, explanation: string, prices: Price[]) {
      this.name = name;
      this.explanation = explanation;
      this.prices = prices;
    }
  }
}
