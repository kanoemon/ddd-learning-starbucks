import {inject} from '@loopback/core';
import {
  get,
  param,
  response,
  HttpErrors,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Beverage,
  BeverageRepository,
  BeverageId,
} from '../../domain/models/products/beverages';
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
    const beverageId: BeverageId = await this.beverageRepository.nextIdentity();
    const beverage: Beverage = new Beverage(
      beverageId,
      aBeverage.name,
      aBeverage.explanation,
    );

    for (const beveragePrice of aBeverage.prices) {
      beverage.addPrice(beveragePrice.size, beveragePrice.price);
    }

    await this.beverageRepository.save(beverage);

    return new CreateBeveragesResponse.Beverage(1);
  }
}
