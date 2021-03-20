import {model, property} from '@loopback/repository';

@model()
export class PriceModel {
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

  constructor(data: Partial<PriceModel>) {
    Object.assign(this, data);
  }
}
