import { HttpErrors } from '@loopback/rest';
import {BeveragesController} from '../../../../controllers/products';
import { Sqlite3BeverageRepository } from '../../../../repositories';

describe('BeveragesController(integration)', () => {
  describe('getDetails()', () => {
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
