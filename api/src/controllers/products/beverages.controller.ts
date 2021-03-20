import {inject} from '@loopback/context';
import {get, param} from '@loopback/openapi-v3';
import {HttpErrors} from '@loopback/rest';
import {
  Beverage,
  BeverageRepository,
} from '../../domain/models/products/beverages';
import {GetBeverageUseCase} from '../../usecases/products/beverages/get-beverage';
import {BeverageModel} from './beverage.model';
import {PriceModel} from './price.model';

export class BeveragesController {
  constructor(
    @inject('repositories.beverageRepository')
    private beverageRepository: BeverageRepository,
  ) {}

  @get('/products/beverages/{beverageId}', {
    responses: {
      '200': {
        description: '200 response',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': BeverageModel,
            },
          },
        },
      },
    },
  })
  async get(
    @param.path.number('beverageId') beverageId: number,
  ): Promise<BeverageModel> {
    const usecase: GetBeverageUseCase = new GetBeverageUseCase(
      this.beverageRepository,
    );
    const beverage: Beverage | null = await usecase.handle({
      id: beverageId,
    });

    if (beverage === null) throw new HttpErrors.NotFound('Beverage not found');

    return new BeverageModel({
      id: beverage.beverageId.id,
      name: beverage.name,
      explanation: beverage.explanation,
      prices: beverage.beveragePrices.map(beveragePrice => {
        return new PriceModel({
          size: beveragePrice.beverageSize.size,
          price: beveragePrice.productPrice.price,
        });
      }),
    });
  }
}
