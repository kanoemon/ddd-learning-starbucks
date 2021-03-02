import { repository } from '@loopback/repository';
import {get, param, response, getModelSchemaRef} from '@loopback/rest';
import {Sqlite3BeverageRepository} from '../../repositories';
import {GetBeverageUseCase} from '../../usecases/products/beverages/get-beverage';
import {GetBeverageModel} from './';

export class BeveragesController {
  constructor(
  ) {}

  @get('/products/beverages/{id}')
  @response(200, {
    description: 'ok',
    content: {
      //'application/json': {schema: getModelSchemaRef(GetBeverageModel)},
      'application/json': {schema: {type: 'string'}},
    },
  })
  async getDetails(
    @param.path.number('id') id: number,
  ): Promise<GetBeverageModel> {
    const usecase: GetBeverageUseCase = new GetBeverageUseCase(
      new Sqlite3BeverageRepository()
    );
    await usecase.handle({
      id: id,
    });
    return new GetBeverageModel({name: 'coffee'});
  }
}
