import { DrinkSize } from "../../../../../src/productmanagement/domain/model/drinks";

describe('DrinkSize', () => {
  describe('create a DrinkSize object', () => {
    test('success', () => {
      const drinkSize = new DrinkSize('short');
      expect(drinkSize.size).toBe('short');

      const sameDrinkSize = new DrinkSize('short');
      expect(drinkSize.equals(sameDrinkSize)).toBe(true);

      const otherDrinkSize = new DrinkSize('tall');
      expect(drinkSize.equals(otherDrinkSize)).toBe(false);
    });
  });
});
