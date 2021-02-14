import { Drink, DrinkId } from "../../../src/productmanagement/domain/model/drinks";
import { InMemoryDrinkRepository } from "../../../src/productmanagement/gateways/InMemoryDrinkRepository";
import { SaveDrinkUseCase } from "../../../src/productmanagement/usecases/savedrink/SaveDrinkUseCase";
import { SaveDrinkUseCaseRequest } from "../../../src/productmanagement/usecases/savedrink/SaveDrinkUseCaseRequest";

describe('save drink menu', () => {
  test('success', () => {
    const request = new SaveDrinkUseCaseRequest(
      'tea',
      [
        {size: 'short', price: 300},
        {size: 'tall', price: 300}
      ]
    );

    const drinkRepository = new InMemoryDrinkRepository();
    const usecase = new SaveDrinkUseCase(drinkRepository);
    const result = usecase.handle(request);

    if (result.fail()) throw new Error('failed');

    const aDrink = drinkRepository.findById(
        new DrinkId(result.response.id)
    );

    if (aDrink === null) throw new Error('failed');
    expect(aDrink.name).toBe('tea');
    expect(aDrink.drinkPrices.length).toBe(2);
  });

  test('aleady exists', () => {
    const request = new SaveDrinkUseCaseRequest(
      'tea',
      [
        {size: 'short', price: 300},
      ]
    );

    const drinkRepository = new InMemoryDrinkRepository();
    drinkRepository.save(
      new Drink(
        new DrinkId(1),
        'tea',
      )
    );

    const usecase = new SaveDrinkUseCase(drinkRepository);
    const result = usecase.handle(request);

    if (!result.fail()) throw new Error('failed');
  });
});
