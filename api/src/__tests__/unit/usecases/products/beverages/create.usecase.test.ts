import { CreateUseCase, NewBeverageCommand } from "../../../../../usecases/products/beverages/create";
import { InMemoryBeverageRepository } from "../../../../../repositories";

describe('create', () => {
  test('ok', async () => {
    const command = new NewBeverageCommand(
      'coffee',
      'new coffee',
      [{size: 'short', price: 500}]
    );

    const repository = new InMemoryBeverageRepository();
    const usecase = new CreateUseCase(repository);
    const result = await usecase.handle(command);

    const beverage = await repository.findById(result);
    if (beverage === null) throw new Error('failed');

    expect(beverage.name).toBe('coffee');
    expect(beverage.explanation).toBe('new coffee');
    expect(beverage.priceofSize('short')?.productPrice.price).toBe(500);
  })
});