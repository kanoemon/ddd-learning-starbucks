import {Beverage, BeverageId} from '../domain/models/products/beverages';
import {BeverageRepository} from '../domain/models/products/beverages/beverage-repository';

const models = require('../infrastructure/sequelize/models');

export class Sqlite3BeverageRepository implements BeverageRepository {
  private _beverages: Beverage[] = [];

  async findById(aBeverageId: BeverageId): Promise<Beverage | null> {
    const foundBeverage = await models.Beverage.findOne({
      attributes: ['id', 'name', 'explanation'],
      where: {
        id: aBeverageId.id,
        deleteFlg: false,
      },
    });
    if (foundBeverage === null) return null;

    const foundBeveragePrices = await models.BeveragePrice.findAll({
      attributes: ['price'],
      where: {
        beverageId: aBeverageId.id,
        deleteFlg: false,
      },
      include: [
        {
          model: models.BeverageSizeMaster,
          required: true,
          attributes: ['name'],
          where: {
            deleteFlg: false,
          },
        },
      ],
    });

    const beverage: Beverage = new Beverage(
      aBeverageId,
      foundBeverage.dataValues.name,
      foundBeverage.dataValues.explanation,
    );
    for (const foundBeveragePrice of foundBeveragePrices) {
      beverage.addPrice(
        foundBeveragePrice.dataValues.BeverageSizeMaster.dataValues.name,
        foundBeveragePrice.dataValues.price,
      );
    }

    return beverage;
  }

  async save(aBeverage: Beverage): Promise<void> {
    const createdBeverage = await models.Beverage.create({
      name: aBeverage.name,
      explanation: aBeverage.explanation,
    });

    for (const aBeveragePrice of aBeverage.beveragePrices) {
      const sizeMaster = await models.BeverageSizeMaster.findOne({
        where: {
          name: aBeveragePrice.beverageSize.size,
        },
      });
      await models.BeveragePrice.create({
        beverageId: createdBeverage.id,
        sizeId: sizeMaster.id,
        price: aBeveragePrice.productPrice.price,
      });
    }
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
