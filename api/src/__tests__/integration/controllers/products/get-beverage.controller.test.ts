import { GetBeverageController } from "../../../../controllers/products/get-beverage.controller";
import {Sqlite3BeverageRepository} from '../../../../repositories';

describe('GetBeverageController', () => {
  it('beverage can find', async () => {
    // test
    const controller = new GetBeverageController(
      new Sqlite3BeverageRepository(),
    );
    await controller.get(1);
  });
});
