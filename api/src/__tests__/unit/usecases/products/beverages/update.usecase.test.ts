import { UpdateBeverageCommand } from "../../../../../usecases/products/beverages/update/update-beverage-command";
import { Beverage, BeverageId } from "../../../../../domain/models/products/beverages";
import { InMemoryBeverageRepository } from "../../../../../repositories";
import { UpdateUseCase } from "../../../../../usecases/products/beverages/update/update.usecase";

describe('Update UseCase', () => {
  test('ok', async () => {
    const command = new UpdateBeverageCommand(1);
    command.name = 'change coffee';
    command.explanation = 'change explanation';
    command.priceOfShort = 500;
    command.priceOfTall = 1000;

    const beverage = new Beverage(
      new BeverageId(1),
      'coffee',
      'hogehoge'
    );
    beverage.addPrice('short', 100);
    beverage.addPrice('tall', 100);

    const repository = new InMemoryBeverageRepository();
    repository.save(beverage);

    const usecase = new UpdateUseCase(repository);
    const result = await usecase.handle(command);

    const aBeverage = await repository.findById(result);
    if (aBeverage === null) throw new Error('failed');

    expect(aBeverage.name).toBe('change coffee');
    expect(aBeverage.explanation).toBe('change explanation');
    expect(aBeverage.priceofSize('short')?.productPrice.price).toBe(500);
    expect(aBeverage.priceofSize('tall')?.productPrice.price).toBe(1000);
  });
});