import {DeleteBeverageController} from '../../../../controllers/products';
import {Sqlite3BeverageRepository} from '../../../../repositories';

const models = require('../../../../infrastructure/sequelize/models');

describe('DeleteBeverageController', () => {
  afterEach(async () => {
    await models.BeveragePrice.destroy({
      truncate: true,
    });
    await models.Beverage.destroy({
      truncate: true,
    });
  });

  describe('delete', () => {
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
      const controller = new DeleteBeverageController(
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
