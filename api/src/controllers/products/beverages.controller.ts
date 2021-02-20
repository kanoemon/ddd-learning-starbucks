import {get, param, response, getModelSchemaRef, operation} from '@loopback/rest';
import {GetBeverageUseCase, GetBeverageModel} from '../../usecases/products/beverages/get-beverage';

export class BeveragesController {
  constructor() {}

  @get('/products/beverages/{id}')
  @response(200, {
    content: {'application/json': {schema: getModelSchemaRef(GetBeverageModel)}}
  })
  async findById(
    @param.path.number('id') id: number
  ): Promise<GetBeverageModel> {
    const usecase: GetBeverageUseCase = new GetBeverageUseCase();
    return usecase.handle(id);
  }
}
