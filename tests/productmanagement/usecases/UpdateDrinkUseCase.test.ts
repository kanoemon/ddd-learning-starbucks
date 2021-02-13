import { Drink } from "../../../src/productmanagement/domain/model/Drink";
import { DrinkId } from "../../../src/productmanagement/domain/model/DrinkId";
import { InMemoryDrinkRepository } from "../../../src/productmanagement/gateways/InMemoryDrinkRepository";
import { UpdateDrinkUseCase } from "../../../src/productmanagement/usecases/updatedrink/UpdateDrinkUseCase";
import { UpdateDrinkUseCaseRequest } from "../../../src/productmanagement/usecases/updatedrink/UpdateDrinkUseCaseRequest";

describe('update a drink menu', () => {
  test('update name', () => {
    const drinkRepository = new InMemoryDrinkRepository();
    drinkRepository.save(
      new Drink(
        new DrinkId(1),
        'tea',
        'short'
      )
    );
    const usecase = new UpdateDrinkUseCase(drinkRepository);

    const result = usecase.handle(
      new UpdateDrinkUseCaseRequest(
        1,
        'menu changed',
        'short'
      )
    );

    if (result.fail()) throw new Error('failed');

    expect(result.response.name).toBe('menu changed');
    expect(result.response.size).toBe('short');
  });
});