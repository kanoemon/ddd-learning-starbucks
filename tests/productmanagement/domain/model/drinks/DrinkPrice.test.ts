import { DrinkPrice, DrinkSize } from "../../../../../src/productmanagement/domain/model/drinks";
import { MenuPrice } from "../../../../../src/productmanagement/domain/model/MenuPrice";

describe('DrinkPrice', () => {
  describe('create a DrinkPrice object', () => {
    test('success', () => {
      const drinkPrice = new DrinkPrice(
        new DrinkSize('short'),
        new MenuPrice(300)
      );
      expect(drinkPrice.drinkSize.size).toBe('short');
      expect(drinkPrice.menuPrice.price).toBe(300);

      const sameDrinkPrice = new DrinkPrice(
        new DrinkSize('short'),
        new MenuPrice(300)
      );
      expect(drinkPrice.equals(sameDrinkPrice)).toBe(true);

      const otherDrinkPrice = new DrinkPrice(
        new DrinkSize('short'),
        new MenuPrice(400)
      );
      expect(drinkPrice.equals(otherDrinkPrice)).toBe(false);
    });
  });
});
