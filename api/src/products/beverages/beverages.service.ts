import { Injectable } from '@nestjs/common';
import { BeveragesRepository } from './beverages.repository';
import { Beverage, BeverageId } from './domain/models';

@Injectable()
export class BeveragesService {
  constructor(private beverageRepository: BeveragesRepository) {}

  async get(aBeverageId: number): Promise<Beverage> {
    const beverageId: BeverageId = new BeverageId(aBeverageId);
    return await this.beverageRepository.findById(beverageId);
  }
}
