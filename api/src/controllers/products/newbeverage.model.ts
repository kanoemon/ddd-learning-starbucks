import {model, property} from '@loopback/repository';
import {PriceModel} from './price.model';

@model()
export class NewBeverageModel {
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

  constructor(data: Partial<NewBeverageModel>) {
    Object.assign(this, data);
  }
}
