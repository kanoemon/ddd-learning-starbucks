import { Beverage, BeverageId, BeverageRepository } from "../../../../domain/models/products/beverages";
import { UpdateBeverageCommand } from "./update-beverage-command";

export class UpdateUseCase {
  private _beverageRepository: BeverageRepository;

  constructor(beverageRepository: BeverageRepository) {
    this._beverageRepository = beverageRepository;
  }

  async handle(command: UpdateBeverageCommand): Promise<BeverageId> {
    const beverageId: BeverageId = new BeverageId(command.id);
    const beverage: Beverage | null = await this._beverageRepository.findById(beverageId);
    if (beverage === null) throw new Error('not found'); 

    if (command.name) beverage.changeName(command.name);
    if (command.explanation) beverage.changeExplanation(command.explanation);
    if (command.priceOfShort) beverage.changePriceOfSize('short', command.priceOfShort);
    if (command.priceOfTall) beverage.changePriceOfSize('tall', command.priceOfTall);

    return beverageId;
  }
}