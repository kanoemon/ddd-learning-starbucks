import {Model, model, property} from '@loopback/repository';

@model()
export class PriceModel extends Model {
  @property({
    description: 'サイズ',
    type: 'string',
  })
  size?: string;

  @property({
    description: '価格',
    type: 'number',
  })
  price?: number;

  constructor(data?: Partial<PriceModel>) {
    super(data);
  }
}

@model()
export class GetBeverageModel extends Model {
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
  explanation?: string;

  @property.array(PriceModel)
  prices?: PriceModel[];

  constructor(data?: Partial<GetBeverageModel>) {
    super(data);
  }
}
