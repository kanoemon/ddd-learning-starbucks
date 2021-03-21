import {model, property} from '@loopback/repository';

@model()
export class BeverageIdModel {
  @property({
    description: 'ID',
    type: 'number',
  })
  id: number;

  constructor(data: Partial<BeverageIdModel>) {
    Object.assign(this, data);
  }
}
