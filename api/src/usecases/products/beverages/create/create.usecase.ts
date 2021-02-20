import { Beverage, BeverageId, BeverageRepository } from "../../../../domain/models/products/beverages";
import { NewBeverageCommand } from "./new-beverage-command";

export class CreateUseCase {
  private _beverageRepository: BeverageRepository;

  constructor(beverageRepository: BeverageRepository) {
    this._beverageRepository = beverageRepository;
  }

  async handle(newBeverageCommand: NewBeverageCommand): Promise<BeverageId> {
    const beverageId: BeverageId = await this._beverageRepository.nextIdentity();
    const beverage: Beverage = new Beverage(
      beverageId,
      newBeverageCommand.name,
      newBeverageCommand.explanation
    );

    for (const aPrice of newBeverageCommand.prices) {
      beverage.addPrice(aPrice.size, aPrice.price);
    }

    await this._beverageRepository.save(beverage);

    return beverageId;
  }
}
