import {BeveragesController} from '../../../../controllers/products';
import { Sqlite3BeverageRepository } from '../../../../repositories';

describe('BeveragesController(integration)', () => {
  describe('getDetails()', () => {
    it ('ok', async () => {
      const controller = new BeveragesController(
        new Sqlite3BeverageRepository()
      );
      const result = await controller.getDetails(1);
      console.log(result);
    });
  });
});
