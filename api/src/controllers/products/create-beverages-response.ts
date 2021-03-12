import {model, property} from '@loopback/repository';

export namespace CreateBeveragesResponse {
  @model()
  export class Beverage {
    @property({
      description: 'ID',
      type: 'number'
    })
    id: number;

    constructor(id: number) {
      this.id = id;
    }
  }
}
