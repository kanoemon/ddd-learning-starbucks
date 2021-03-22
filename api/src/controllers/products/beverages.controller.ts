import {inject} from '@loopback/context';
import {del, get, param, post, requestBody} from '@loopback/openapi-v3';
import {HttpErrors} from '@loopback/rest';
import {
  Beverage,
  BeverageId,
  BeverageRepository,
} from '../../domain/models/products/beverages';
import {CreateUseCase} from '../../usecases/products/beverages/create';
import {DeleteUseCase} from '../../usecases/products/beverages/delete';
import {GetBeverageUseCase} from '../../usecases/products/beverages/get-beverage';
import {BeverageIdModel} from './beverage-id.model';
import {BeverageModel} from './beverage.model';
import {NewBeverageModel} from './newbeverage.model';
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

  @post('/products/beverages', {
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
  async create(
    @requestBody() newBeverage: NewBeverageModel,
  ): Promise<BeverageIdModel> {
    const usecase: CreateUseCase = new CreateUseCase(this.beverageRepository);
    const beverageId: BeverageId = await usecase.handle({
      name: newBeverage.name,
      explanation: newBeverage.explanation,
      prices: newBeverage.prices.map(beveragePrice => {
        return {size: beveragePrice.size, price: beveragePrice.price};
      }),
    });
    return new BeverageIdModel({
      id: beverageId.id,
    });
  }

  @del('/products/beverages/{beverageId}', {
    responses: {
      '200': {
        description: '200 response',
      },
    },
  })
  async remove(
    @param.path.number('beverageId') beverageId: number,
  ): Promise<void> {
    const usecase: DeleteUseCase = new DeleteUseCase(this.beverageRepository);
    await usecase.handle({
      id: beverageId,
    });
  }
}
