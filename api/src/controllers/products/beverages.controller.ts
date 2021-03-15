import {inject} from '@loopback/core';
import {
  get,
  param,
  response,
  HttpErrors,
  post,
  requestBody,
  del,
  put,
} from '@loopback/rest';
import {
  Beverage,
  BeverageRepository,
  BeverageId,
} from '../../domain/models/products/beverages';
import { CreateUseCase } from '../../usecases/products/beverages/create';
import {GetBeverageUseCase} from '../../usecases/products/beverages/get-beverage';
import {GetBeverageResponse, Price} from './';
import {CreateBeveragesRequest} from './create-beverages-request';
import {CreateBeveragesResponse} from './create-beverages-response';

export class BeveragesController {
  constructor(
    @inject('repositories.beverageRepository')
    private beverageRepository: BeverageRepository,
  ) {}

  @get('/products/beverages/{id}')
  @response(200, {
    description: 'ok',
    content: {
      'application/json': {
        schema: {
          'x-ts-type': GetBeverageResponse,
        },
      },
    },
  })
  async getDetails(
    @param.path.number('id') id: number,
  ): Promise<GetBeverageResponse> {
    const usecase: GetBeverageUseCase = new GetBeverageUseCase(
      this.beverageRepository,
    );
    const beverage: Beverage | null = await usecase.handle({
      id: id,
    });

    if (beverage === null) throw new HttpErrors.NotFound('Beverage not found');

    return new GetBeverageResponse(
      beverage.beverageId.id,
      beverage.name,
      beverage.explanation,
      beverage.beveragePrices.map(beveragePrice => {
        return new Price(
          beveragePrice.beverageSize.size,
          beveragePrice.productPrice.price,
        );
      }),
    );
  }

  @post('/products/beverages')
  @response(200, {
    description: 'ok',
  })
  async create(
    @requestBody() aBeverage: CreateBeveragesRequest.Beverage,
  ): Promise<CreateBeveragesResponse.Beverage> {
    const usecase: CreateUseCase = new CreateUseCase(this.beverageRepository);
    const beverageId: BeverageId = await usecase.handle({
      name: aBeverage.name,
      explanation: aBeverage.explanation,
      prices: aBeverage.prices.map((beveragePrice) => {
        return {size: beveragePrice.size, price: beveragePrice.price}
      })
    });

    return new CreateBeveragesResponse.Beverage(beverageId.id);
  }

  @del('/products/beverages/{id}', {
    responses: {
      '200': {
        description: 'ok',
      },
    },
  })
  async remove(@param.path.number('id') id: number): Promise<void> {
    await this.beverageRepository.remove(new BeverageId(id));
  }

  @put('/products/beverages/{id}', {
    responses: {
      '200': {
        description: 'ok',
      }
    }
  })
  async update(
    @param.path.number('id') id: number,
    @requestBody() request: string
  ): Promise<void> {

  }
}
