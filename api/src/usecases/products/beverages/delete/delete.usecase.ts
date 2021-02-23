import {
  BeverageId,
  BeverageRepository,
} from '../../../../domain/models/products/beverages';
import {DeleteBeverageCommand} from './delete-beverage-command';

export class DeleteUseCase {
  constructor(private beverageRepository: BeverageRepository) {}

  async handle(command: DeleteBeverageCommand): Promise<void> {
    await this.beverageRepository.remove(new BeverageId(command.id));
  }
}
