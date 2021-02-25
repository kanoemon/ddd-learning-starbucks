import {BeveragesController} from '../../../../controllers/products';

describe('BeveragesController(integration)', () => {
  describe('getDetails()', () => {
    it ('ok', async () => {
      const controller = new BeveragesController();
      const result = await controller.getDetails(1);
      console.log(result);
    });
  });
});
