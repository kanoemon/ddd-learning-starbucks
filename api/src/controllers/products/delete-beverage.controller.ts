import {inject} from '@loopback/context';
import {del, param} from '@loopback/openapi-v3';
import {BeverageRepository} from '../../domain/models/products/beverages';
import {DeleteUseCase} from '../../usecases/products/beverages/delete';

export class DeleteBeverageController {
  constructor(
    @inject('repositories.beverageRepository')
    private beverageRepository: BeverageRepository,
  ) {}

  @del('/products/beverages/{id}', {
    responses: {
      '200': {
        description: 'ok',
      },
    },
  })
  async remove(@param.path.number('id') id: number): Promise<void> {
    const usecase: DeleteUseCase = new DeleteUseCase(this.beverageRepository);
    await usecase.handle({
      id: id,
    });
  }
}
