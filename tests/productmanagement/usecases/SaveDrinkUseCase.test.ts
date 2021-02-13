import { Drink } from "../../../src/productmanagement/domain/model/Drink";
import { DrinkId } from "../../../src/productmanagement/domain/model/DrinkId";
import { InMemoryDrinkRepository } from "../../../src/productmanagement/gateways/InMemoryDrinkRepository";
import { SaveDrinkUseCase } from "../../../src/productmanagement/usecases/savedrink/SaveDrinkUseCase";
import { SaveDrinkUseCaseRequest } from "../../../src/productmanagement/usecases/savedrink/SaveDrinkUseCaseRequest";

describe('save drink menu', () => {
  test('success', () => {
    const drinkRepository = new InMemoryDrinkRepository();
    const usecase = new SaveDrinkUseCase(drinkRepository);
    const result = usecase.handle(
      new SaveDrinkUseCaseRequest('tea', 'short')
    );

    if (result.fail()) throw new Error('failed');

    const aDrink = drinkRepository.findByName(
      new Drink(
        new DrinkId(result.response.id),
        'tea',
        'short'
      )
    );

    if (aDrink === null) throw new Error('failed');
    expect(aDrink.name).toBe('tea');
    expect(aDrink.size).toBe('short');
  });

  test('aleady exists', () => {
    const drinkRepository = new InMemoryDrinkRepository();
    drinkRepository.save(
      new Drink(
        new DrinkId(1),
        'tea',
        'short'
      )
    );

    const usecase = new SaveDrinkUseCase(drinkRepository);
    const result = usecase.handle(
      new SaveDrinkUseCaseRequest('tea', 'short')
    );

    if (!result.fail()) throw new Error('failed');
  });
});
