import {UpdateBeverageCommand} from '../../../../../usecases/products/beverages/update/update-beverage-command';
import {
  Beverage,
  BeverageId,
} from '../../../../../domain/models/products/beverages';
import {InMemoryBeverageRepository} from '../../../../../repositories';
import {UpdateUseCase} from '../../../../../usecases/products/beverages/update/update.usecase';

describe('Update UseCase', () => {
  test('ok', async () => {
    const beverage = new Beverage(new BeverageId(1), 'coffee', 'hogehoge');
    beverage.addPrice('short', 100);
    beverage.addPrice('tall', 100);

    const repository = new InMemoryBeverageRepository();
    repository.save(beverage);

    const usecase = new UpdateUseCase(repository);
    const result = await usecase.handle({
      id: 1,
      name: 'change coffee',
      explanation: 'change explanation',
      priceOfShort: 500,
      priceOfTall: 1000,
    });

    const aBeverage = await repository.findById(result);
    if (aBeverage === null) throw new Error('failed');

    expect(aBeverage.name).toBe('change coffee');
    expect(aBeverage.explanation).toBe('change explanation');
    expect(aBeverage.priceofSize('short')?.productPrice.price).toBe(500);
    expect(aBeverage.priceofSize('tall')?.productPrice.price).toBe(1000);
  });
});
