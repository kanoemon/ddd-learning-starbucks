import {Beverage} from '../../../../domain/models/products/beverages';

export class GetProductUseCase {
  constructor() {}

  handle(id: number): Beverage {
    const beverage = new Beverage('coffee');
    return beverage;
  }
}
