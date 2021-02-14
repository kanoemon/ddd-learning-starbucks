import { Drink, DrinkId, DrinkSize } from "../../../src/productmanagement/domain/model/drinks";
import { InMemoryDrinkRepository } from "../../../src/productmanagement/gateways/InMemoryDrinkRepository";
import { GetDrinkDetailUseCase } from "../../../src/productmanagement/usecases/getdrinkdetail/GetDrinkDetailUseCase";
import { GetDrinkDetailUseCaseRequest } from "../../../src/productmanagement/usecases/getdrinkdetail/GetDrinkDetailUseCaseRequest";
import { MenuPrice } from "../../../src/productmanagement/domain/model/MenuPrice";

describe('get drink menu detail', () => {
  test('get details of a drink menu', () => {
    const drink = new Drink(new DrinkId(1), 'coffee');
    drink.registerPrice(new DrinkSize('short'), new MenuPrice(300));

    const drinkRepository = new InMemoryDrinkRepository();
    drinkRepository.save(drink);

    const usecase = new GetDrinkDetailUseCase(drinkRepository);
    const result = usecase.handle(
      new GetDrinkDetailUseCaseRequest(1)
    );

    if (result.fail()) throw new Error('failed');

    expect(result.response.id).toBe(1);
    expect(result.response.name).toBe('coffee');
    expect(result.response.prices.length).toBe(1);
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
