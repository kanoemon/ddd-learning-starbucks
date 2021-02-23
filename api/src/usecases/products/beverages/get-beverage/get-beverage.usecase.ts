import {Beverage, BeverageId, BeverageRepository} from '../../../../domain/models/products/beverages';
import { GetBeverageCommand } from './get-beverage-command';

export class GetBeverageUseCase {
  constructor(private beverageRepository: BeverageRepository) {}

  async handle(command: GetBeverageCommand): Promise<Beverage | null> {
    const beverageId: BeverageId = new BeverageId(command.id); 
    const beverage = this.beverageRepository.findById(beverageId);
    return beverage;
  }
}
