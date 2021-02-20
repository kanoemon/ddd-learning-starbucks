import {Beverage} from '../../../../domain/models/products/beverages';
import {GetBeverageModel} from './get-beverage.model';

export class GetBeverageUseCase {
  constructor() {}

  handle(id: number): GetBeverageModel {
    const beverage = new Beverage('coffee');
    return new GetBeverageModel({name: 'coffee'});
  }
}
