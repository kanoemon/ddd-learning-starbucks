import {BeverageId, BeverageRepository} from '../../../../domain/models/products/beverages';
import { DeleteBeverageCommand } from './delete-beverage-command';

export class DeleteUseCase {
  private _beverageRepository: BeverageRepository;

  constructor(beverageRepository: BeverageRepository) {
    this._beverageRepository = beverageRepository;
  }

  async handle(command: DeleteBeverageCommand): Promise<void> {
    await this._beverageRepository.remove(
      new BeverageId(command.id)
    );
  }
}
