import {BeveragesController} from '../../../../controllers/products';
import { Sqlite3BeverageRepository } from '../../../../repositories';

const models = require('../../../../infrastructure/sequelize/models');

describe('BeveragesController(integration)', () => {
  describe('beverage', () => {
    afterEach(async () => {
      /*
      await models.Beverages.destroy({
        truncate: true
      });*/
    });

    it ('can find', async () => {
      // create data
      const hogehoge = await models.BeverageSizeMaster.findAll();
      console.log(hogehoge);

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
