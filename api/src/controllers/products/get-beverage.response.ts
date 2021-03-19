import {model, property} from '@loopback/repository';

export namespace GetBeverageResponse {
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

    constructor(data: Partial<Price>) {
      Object.assign(this, data);
    }
  }

  @model()
  export class Beverage {
    @property({
      description: 'ID',
      type: 'number',
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

    constructor(data: Partial<Beverage>) {
      Object.assign(this, data);
    }
  }
}
