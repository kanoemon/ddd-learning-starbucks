import {
  Beverage,
  BeverageId,
  BeverageRepository,
} from '../../../../domain/models/products/beverages';
import {NewBeverageCommand} from './new-beverage-command';

export class CreateUseCase {
  constructor(private beverageRepository: BeverageRepository) {}

  async handle(newBeverageCommand: NewBeverageCommand): Promise<BeverageId> {
    const beverageId: BeverageId = await this.beverageRepository.nextIdentity();
    const beverage: Beverage = new Beverage(
      beverageId,
      newBeverageCommand.name,
      newBeverageCommand.explanation,
    );

    for (const aPrice of newBeverageCommand.prices) {
      beverage.addPrice(aPrice.size, aPrice.price);
    }

    return await this.beverageRepository.save(beverage);
  }
}
