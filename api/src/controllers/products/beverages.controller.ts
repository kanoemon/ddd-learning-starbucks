import {get, param, response, getModelSchemaRef} from '@loopback/rest';
import { InMemoryBeverageRepository } from '../../repositories';
import {GetBeverageUseCase} from '../../usecases/products/beverages/get-beverage';
import {GetBeverageModel} from './';

export class BeveragesController {
  constructor() {}

  @get('/products/beverages/{id}')
  @response(200, {
    description: 'ok',
    content: {'application/json': {schema: getModelSchemaRef(GetBeverageModel)}}
  })
  async findById(
    @param.path.number('id') id: number
  ): Promise<GetBeverageModel> {
    const usecase: GetBeverageUseCase = new GetBeverageUseCase(
      new InMemoryBeverageRepository()
    );
    await usecase.handle({
      id: id
    });
    return new GetBeverageModel({name: 'coffee'});
  }
}
