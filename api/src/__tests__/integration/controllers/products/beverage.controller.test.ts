import { INTEGER } from 'sequelize/types';
import {BeveragesController} from '../../../../controllers/products';
import { Beverage } from '../../../../domain/models/products/beverages';
import { Sqlite3BeverageRepository } from '../../../../repositories';

const models = require('../../../../infrastructure/sequelize/models');

describe('BeveragesController(integration)', () => {
  describe('beverage', () => {
    afterEach(async () => {
      await models.BeveragePrice.destroy({
        truncate: true
      });
      await models.Beverage.destroy({
        truncate: true
      });
    });

    it ('can find', async () => {
      // create data
      await models.Beverage.create({
        name: 'coffee',
        explanation: 'hogehoge'
      });
      const targetBeverage = await models.Beverage.findOne({
        attributes: ['id'],
        where: {
          name: 'coffee'
        }
      });
      await models.BeveragePrice.create({
        beverageId: targetBeverage.dataValues.id,
        sizeId: 1,
        price: 100
      });

      // test
      const controller = new BeveragesController(
        new Sqlite3BeverageRepository()
      );
      await controller.getDetails(targetBeverage.dataValues.id)
    });

    it ('not found', async () => {
      try {
        const controller = new BeveragesController(
          new Sqlite3BeverageRepository()
        );
        await controller.getDetails(1)

        throw new Error('failed');
      } catch(e) {
        expect(e.status).toBe(404);
        expect(e.message).toBe('Beverage not found');
      }
    });
  });
});
