import { Drink, DrinkId, DrinkSize } from "../../../../../src/productmanagement/domain/model/drinks";
import { MenuPrice } from "../../../../../src/productmanagement/domain/model/MenuPrice";

describe('Drink', () => {
  describe('create a Drink object', () => {
    test('success', () => {
      const drink = new Drink(
        new DrinkId(1),
        'coffee'
      );
      drink.registerPrice(
        new DrinkSize('short'), 
        new MenuPrice(300))
      ;

      expect(drink.drinkId.id).toBe(1);
      expect(drink.name).toBe('coffee');

      const sameDrink = new Drink(
        new DrinkId(1),
        'coffee'
      );
      expect(drink.equals(sameDrink)).toBe(true);

      const otherDrink = new Drink(
        new DrinkId(2),
        'coffee'
      );
      expect(drink.equals(otherDrink)).toBe(false);
    });
  });
});
