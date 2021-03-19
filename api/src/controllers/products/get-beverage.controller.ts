import {inject} from '@loopback/core';
import {get, HttpErrors, param} from '@loopback/rest';
import {
  Beverage,
  BeverageRepository,
} from '../../domain/models/products/beverages';
import {GetBeverageUseCase} from '../../usecases/products/beverages/get-beverage';
import {GetBeverageResponse} from './get-beverage.response';

export class GetBeverageController {
  constructor(
    @inject('repositories.beverageRepository')
    private beverageRepository: BeverageRepository,
  ) {}

  @get('/products/beverages/{id}', {
    responses: {
      '200': {
        description: 'ok',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': GetBeverageResponse.Beverage,
            },
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
  ): Promise<GetBeverageResponse.Beverage> {
    const usecase: GetBeverageUseCase = new GetBeverageUseCase(
      this.beverageRepository,
    );
    const beverage: Beverage | null = await usecase.handle({
      id: id,
    });

    if (beverage === null) throw new HttpErrors.NotFound('Beverage not found');

    return new GetBeverageResponse.Beverage({
      id: beverage.beverageId.id,
      name: beverage.name,
      explanation: beverage.explanation,
      prices: beverage.beveragePrices.map(beveragePrice => {
        return new GetBeverageResponse.Price({
          size: beveragePrice.beverageSize.size,
          price: beveragePrice.productPrice.price,
        });
      }),
    });
  }
}
