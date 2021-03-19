import {GetBeverageController} from '../../../../controllers/products/get-beverage.controller';
import {Sqlite3BeverageRepository} from '../../../../repositories';

const models = require('../../../../infrastructure/sequelize/models');

describe('GetBeverageController', () => {
  afterEach(async () => {
    await models.BeveragePrice.destroy({
      truncate: true,
    });
    await models.Beverage.destroy({
      truncate: true,
    });
  });

  it('beverage can find', async () => {
    // create data
    await models.Beverage.create({
      name: 'coffee',
      explanation: 'hogehoge',
    });
    const targetBeverage = await models.Beverage.findOne({
      attributes: ['id'],
      where: {
        name: 'coffee',
      },
    });
    await models.BeveragePrice.create({
      beverageId: targetBeverage.dataValues.id,
      sizeId: 1,
      price: 100,
    });

    // test
    const controller = new GetBeverageController(
      new Sqlite3BeverageRepository(),
    );
    const response = await controller.get(targetBeverage.dataValues.id);

    expect(response.name).toBe('coffee');
    expect(response.explanation).toBe('hogehoge');
    expect(response.prices[0].size).toBe('short');
    expect(response.prices[0].price).toBe(100);
  });

  it('beverage can not find', async () => {
    try {
      const controller = new GetBeverageController(
        new Sqlite3BeverageRepository(),
      );
      await controller.get(1);

      throw new Error('failed');
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('Beverage not found');
    }
  });
});