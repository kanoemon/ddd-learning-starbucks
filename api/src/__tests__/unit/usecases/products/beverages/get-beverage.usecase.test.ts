import { Beverage, BeverageId } from "../../../../../domain/models/products/beverages";
import { InMemoryBeverageRepository } from "../../../../../repositories";
import { GetBeverageUseCase } from "../../../../../usecases/products/beverages/get-beverage";

describe('Get Beverage Usecase', () => {
  test('ok', async () => {
    const beverage = new Beverage(
      new BeverageId(1),
      'coffee',
      'hot coffee'
    );
    beverage.addPrice('short', 300);
    beverage.addPrice('tall', 400);

    const repository = new InMemoryBeverageRepository();
    repository.save(beverage);

    const usecase = new GetBeverageUseCase(repository);
    const result = await usecase.handle({
      id: 1
    });
    if (result === null) throw new Error('failed');

    expect(result.beverageId.id).toBe(1);
    expect(result.name).toBe('coffee');
    expect(result.explanation).toBe('hot coffee');
    expect(result.priceofSize('short')?.productPrice.price).toBe(300);
    expect(result.priceofSize('tall')?.productPrice.price).toBe(400);
  });
});
