import { Drink } from "../../../src/productmanagement/domain/model/Drink";
import { DrinkId } from "../../../src/productmanagement/domain/model/DrinkId";
import { InMemoryDrinkRepository } from "../../../src/productmanagement/gateways/InMemoryDrinkRepository";
import { ErrorResponse } from "../../../src/productmanagement/usecases/ErrorResponse";
import { GetDrinkMenuDetailUseCase } from "../../../src/productmanagement/usecases/getmenudetail/GetDrinkMenuDetailUseCase";
import { GetDrinkMenuDetailUseCaseRequest } from "../../../src/productmanagement/usecases/getmenudetail/GetDrinkMenuDetailUseCaseRequest";
import { GetDrinkMenuDetailUseCaseResponse } from "../../../src/productmanagement/usecases/getmenudetail/GetDrinkMenuDetailUseCaseResponse";

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

    const usecase = new GetDrinkMenuDetailUseCase(
      drinkRepository
    );
    const result = usecase.handle(
      new GetDrinkMenuDetailUseCaseRequest(1)
    );

    if (result.fail()) throw new Error('failed');

    expect(result.response.id).toBe(1);
    expect(result.response.name).toBe('drip coffee');
    expect(result.response.size).toBe('short');
  });

  test('not found', () => {
    const drinkRepository = new InMemoryDrinkRepository();

    const usecase = new GetDrinkMenuDetailUseCase(
      drinkRepository
    );
    const result = usecase.handle(
      new GetDrinkMenuDetailUseCaseRequest(1)
    );

    if (!result.fail()) throw new Error('failed');
  });
});
