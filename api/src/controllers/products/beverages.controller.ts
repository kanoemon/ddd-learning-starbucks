import {inject} from '@loopback/core';
import {get, param, response} from '@loopback/rest';
import {Beverage, BeverageRepository} from '../../domain/models/products/beverages';
import {GetBeverageUseCase} from '../../usecases/products/beverages/get-beverage';
import {GetBeverageResponse, Price} from './';

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
          'x-ts-type': GetBeverageResponse
        }
      },
    },
  })
  async getDetails(
    @param.path.number('id') id: number,
  ): Promise<GetBeverageResponse> {
    const usecase: GetBeverageUseCase = new GetBeverageUseCase(
      this.beverageRepository
    );
    const beverage: Beverage | null = await usecase.handle({
      id: id,
    });
    const getBeverageResponse: GetBeverageResponse = new GetBeverageResponse();

    if (beverage === null) return getBeverageResponse;

    getBeverageResponse.id = beverage.beverageId.id;
    getBeverageResponse.name = beverage.name;
    getBeverageResponse.explanation = beverage.explanation;

    return getBeverageResponse;
    //return new GetBeverageResponse({name: 'coffee'});
  }
}
