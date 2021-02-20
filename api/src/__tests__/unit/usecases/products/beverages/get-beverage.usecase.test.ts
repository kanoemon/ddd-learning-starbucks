import { InMemoryBeverageRepository } from "../../../../../repositories";
import { GetBeverageUseCase } from "../../../../../usecases/products/beverages/get-beverage";

describe('Get Beverage Usecase', () => {
  test('ok', async () => {
    const usecase = new GetBeverageUseCase(
      new InMemoryBeverageRepository()
    );
    const result = await usecase.handle(1);

    expect(result.name).toBe('coffee');
  });
});
