import {get, param, response, getModelSchemaRef} from '@loopback/rest';
import { Beverage } from '../../domain/models/products/beverages';
import {GetProductUseCase} from '../../usecases/products/beverages/get-product';

export class Beverages {
  constructor() {}

  @get('/products/beverages/{id}')
  @response(200, {
    content: {'application/json': {schema: getModelSchemaRef(Beverage)}}
  })
  async findById(
    @param.path.number('id') id: number
  ): Promise<Beverage> {
    const usecase: GetProductUseCase = new GetProductUseCase();
    return usecase.handle(id);
  }
}
