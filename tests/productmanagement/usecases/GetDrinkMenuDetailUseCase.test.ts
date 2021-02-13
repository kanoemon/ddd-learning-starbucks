import { Drink } from "../../../src/productmanagement/domain/model/Drink";
import { DrinkId } from "../../../src/productmanagement/domain/model/DrinkId";
import { InMemoryDrinkRepository } from "../../../src/productmanagement/gateways/InMemoryDrinkRepository";
import { GetDrinkDetailUseCase } from "../../../src/productmanagement/usecases/getdrinkdetail/GetDrinkDetailUseCase";
import { GetDrinkDetailUseCaseRequest } from "../../../src/productmanagement/usecases/getdrinkdetail/GetDrinkDetailUseCaseRequest";

describe('get drink menu detail', () => {
  test('get details of a drink menu', () => {
    const drinkRepository = new InMemoryDrinkRepository();
    drinkRepository.save(
      new Drink(
        new DrinkId(1),
        'drip coffee',
        'short'
      )
    );

    const usecase = new GetDrinkDetailUseCase(
      drinkRepository
    );
    const result = usecase.handle(
      new GetDrinkDetailUseCaseRequest(1)
    );

    if (result.fail()) throw new Error('failed');

    expect(result.response.id).toBe(1);
    expect(result.response.name).toBe('drip coffee');
    expect(result.response.size).toBe('short');
  });

  test('not found', () => {
    const drinkRepository = new InMemoryDrinkRepository();

    const usecase = new GetDrinkDetailUseCase(
      drinkRepository
    );
    const result = usecase.handle(
      new GetDrinkDetailUseCaseRequest(1)
    );

    if (!result.fail()) throw new Error('failed');
  });
});
