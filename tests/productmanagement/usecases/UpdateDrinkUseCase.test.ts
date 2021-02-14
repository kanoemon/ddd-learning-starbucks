import { Drink, DrinkId, DrinkPrice, DrinkSize } from "../../../src/productmanagement/domain/model/drinks";
import { MenuPrice } from "../../../src/productmanagement/domain/model/MenuPrice";
import { InMemoryDrinkRepository } from "../../../src/productmanagement/gateways/InMemoryDrinkRepository";
import { UpdateDrinkUseCase } from "../../../src/productmanagement/usecases/updatedrink/UpdateDrinkUseCase";
import { UpdateDrinkUseCaseRequest } from "../../../src/productmanagement/usecases/updatedrink/UpdateDrinkUseCaseRequest";

describe('update a drink menu', () => {
  test('update name', () => {
    const drink = new Drink(new DrinkId(1), 'coffee');
    drink.registerPrice(new DrinkSize('short'), new MenuPrice(300));

    const drinkRepository = new InMemoryDrinkRepository();
    drinkRepository.save(drink);

    const usecase = new UpdateDrinkUseCase(drinkRepository);

    const request = new UpdateDrinkUseCaseRequest(1);
    request.setName('menu changed');

    const result = usecase.handle(request);
    if (result.fail()) throw new Error('failed');

    const aDrink = drinkRepository.findById(
        new DrinkId(result.response.id)
    );

    if (aDrink === null) throw new Error('failed');
    expect(aDrink.name).toBe('menu changed');
  });

  test('update prices', () => {
    const drink = new Drink(new DrinkId(1), 'coffee');
    drink.registerPrice(new DrinkSize('short'), new MenuPrice(300));

    const drinkRepository = new InMemoryDrinkRepository();
    drinkRepository.save(drink);

    const usecase = new UpdateDrinkUseCase(drinkRepository);

    const request = new UpdateDrinkUseCaseRequest(1);
    request.setPrices([
      {size: 'short', price: 301},
      {size: 'tall', price: 500}
    ]);

    const result = usecase.handle(request);
    if (result.fail()) throw new Error('failed');

    const aDrink = drinkRepository.findById(
        new DrinkId(result.response.id)
    );

    if (aDrink === null) throw new Error('failed');
    expect(aDrink.drinkPrices).toEqual([
      new DrinkPrice(new DrinkSize('short'), new MenuPrice(301)),
      new DrinkPrice(new DrinkSize('tall'), new MenuPrice(500))
    ]);
  });
});
