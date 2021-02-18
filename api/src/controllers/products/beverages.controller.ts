import {get} from '@loopback/rest';

export class Beverages {
  constructor() {}

  @get('/products/beverages/{id}')
  hello(): string {
    return 'beverage';
  }
}
