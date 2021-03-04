import {inject} from '@loopback/core';
import {get, param, response} from '@loopback/rest';
import {BeverageRepository} from '../../domain/models/products/beverages';
import {GetBeverageUseCase} from '../../usecases/products/beverages/get-beverage';
import {GetBeverageModel} from './';

export class BeveragesController {
  constructor(
    @inject('repositories.beverageRepository') private beverageRepository: BeverageRepository
  ) {}

  @get('/products/beverages/{id}')
  @response(200, {
    description: 'ok',
    content: {
      'application/json': {
        schema: {
          'x-ts-type': GetBeverageModel
        }
      },
    },
  })
  async getDetails(
    @param.path.number('id') id: number,
  ): Promise<GetBeverageModel> {
    const usecase: GetBeverageUseCase = new GetBeverageUseCase(
      this.beverageRepository
    );
    await usecase.handle({
      id: id,
    });
    return new GetBeverageModel({name: 'coffee'});
  }
}
