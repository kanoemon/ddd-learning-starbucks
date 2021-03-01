import { inject } from '@loopback/core';
import { DbDataSource, StarbucksDataSource } from '../datasources';
import {Beverage, BeverageId} from '../domain/models/products/beverages';
import {BeverageRepository} from '../domain/models/products/beverages/beverage-repository';

export class Sqlite3BeverageRepository implements BeverageRepository {
  private _beverages: Beverage[] = [];

  //constructor(@inject('datasources.starbucks') private dataSource: StarbucksDataSource) {}
  constructor(@inject('datasources.db') private dataSource: DbDataSource) {}

  async findById(aBeverageId: BeverageId): Promise<Beverage | null> {
    const beverages: Beverage[] = this._beverages.filter(beverage =>
      beverage.beverageId.equals(aBeverageId),
    );
    return beverages.length > 0 ? beverages[0] : null;
  }

  async save(aBeverage: Beverage): Promise<void> {
    this._beverages.push(aBeverage);
  }

  async nextIdentity(): Promise<BeverageId> {
    return new BeverageId(this._beverages.length + 1);
  }

  async remove(aBeverageId: BeverageId): Promise<void> {
    const ExcludedBeverages: Beverage[] = this._beverages.filter(
      beverage => !beverage.beverageId.equals(aBeverageId),
    );
    this._beverages = ExcludedBeverages;
  }
}