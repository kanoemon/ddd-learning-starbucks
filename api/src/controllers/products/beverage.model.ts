import {model, property} from '@loopback/repository';
import {PriceModel} from './price.model';

@model()
export class BeverageModel {
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

  @property.array(PriceModel)
  prices: PriceModel[];

  constructor(data: Partial<BeverageModel>) {
    Object.assign(this, data);
  }
}
