import {Beverage, BeverageId, BeverageRepository} from '../../../../domain/models/products/beverages';

export class GetBeverageUseCase {
  private beverageRepository: BeverageRepository;

  constructor(beverageRepository: BeverageRepository) {
    this.beverageRepository = beverageRepository;
  }

  async handle(id: number): Promise<Beverage> {
    const beverageId: BeverageId = new BeverageId(id); 
    const beverage = this.beverageRepository.findById(beverageId);
    return beverage;
  }
}
