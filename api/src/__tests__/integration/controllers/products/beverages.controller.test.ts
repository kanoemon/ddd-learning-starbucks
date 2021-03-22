import {NewBeverageModel, PriceModel} from '../../../../controllers/products';
import {BeveragesController} from '../../../../controllers/products/beverages.controller';
import {Sqlite3BeverageRepository} from '../../../../repositories';

const models = require('../../../../infrastructure/sequelize/models');

describe('BeveragesController', () => {
  afterEach(async () => {
    await models.BeveragePrice.destroy({
      truncate: true,
    });
    await models.Beverage.destroy({
      truncate: true,
    });
  });

  describe('get', () => {
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
      const controller = new BeveragesController(
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
        const controller = new BeveragesController(
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

  describe('create', () => {
    it('success', async () => {
      const controller = new BeveragesController(
        new Sqlite3BeverageRepository(),
      );
      const response = await controller.create(
        new NewBeverageModel({
          name: 'coffee',
          explanation: 'hot coffee',
          prices: [
            new PriceModel({
              size: 'short',
              price: 100,
            }),
          ],
        }),
      );

      const beverage = await models.Beverage.findByPk(response.id);

      expect(beverage.name).toBe('coffee');
      expect(beverage.explanation).toBe('hot coffee');
    });
  });

  describe('remove', () => {
    it('success', async () => {
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

      // test
      const controller = new BeveragesController(
        new Sqlite3BeverageRepository(),
      );
      await controller.remove(targetBeverage.dataValues.id);

      const foundBeverage = await models.Beverage.findByPk(
        targetBeverage.dataValues.id,
      );
      expect(foundBeverage.deleteFlg).toBe(true);
    });
  });
});
