import {
  Beverage,
  BeverageId,
} from '../../../../../domain/models/products/beverages';
import {InMemoryBeverageRepository} from '../../../../../repositories';
import {DeleteBeverageCommand} from '../../../../../usecases/products/beverages/delete';
import {DeleteUseCase} from '../../../../../usecases/products/beverages/delete/delete.usecase';

describe('Delete UseCase', () => {
  test('ok', async () => {
    const beverage = new Beverage(new BeverageId(1), 'coffee', 'hoge');

    const repository = new InMemoryBeverageRepository();
    repository.save(beverage);

    const usecase = new DeleteUseCase(repository);
    await usecase.handle({
      id: 1,
    });

    const result = await repository.findById(new BeverageId(1));
    expect(result).toBe(null);
  });
});
