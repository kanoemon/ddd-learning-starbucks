import {inject} from '@loopback/core';
import { model, property } from '@loopback/repository';
import {
  get,
  HttpErrors,
  param,
} from '@loopback/rest';
import { Beverage, BeverageRepository } from '../../domain/models/products/beverages';
import { GetBeverageUseCase } from '../../usecases/products/beverages/get-beverage';

export class GetBeverageController {
  constructor(
    @inject('repositories.beverageRepository')
    private beverageRepository: BeverageRepository,
  ) {}

  @get('/products/beverages/{id}', {
    responses: {
      '200': {
        description: 'ok',
      }
    }
  })
  async get(
    @param.path.number('id') id: number,
  ) {
    const usecase: GetBeverageUseCase = new GetBeverageUseCase(this.beverageRepository);
    const beverage: Beverage | null = await usecase.handle({
      id: id
    });

    //if (beverage === null) throw new HttpErrors.NotFound('Beverage not found');

    return new Response({
      id: 1,
      name: 'coffee',
      explanation: 'hogehoge'
    });
  }
}

@model()
export class Response {
  @property({
    description: 'ID',
    type: 'number',
  })
  id: number;

  @property({
    description: '名前',
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    description: '説明',
    type: 'string',
  })
  explanation: string;

  constructor(data: Partial<Response>) {
    Object.assign(this, data)
  }
}
