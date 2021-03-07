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
    });

    it ('can find', async () => {
      // create data
      await models.BeveragePrice.create({
        beverageId: 1,
        sizeId: 1,
        price: 100
      });

      //const hogehoge = await models.BeverageSizeMaster.findAll();

      // test
      const controller = new BeveragesController(
        new Sqlite3BeverageRepository()
      );
      await controller.getDetails(1)
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
