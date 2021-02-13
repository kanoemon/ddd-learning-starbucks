import { DrinkPrice } from "../../../../src/productmanagement/domain/model/DrinkPrice";
import { MenuPrice } from "../../../../src/productmanagement/domain/model/MenuPrice";

describe('create a drink price', () => {
  test('equals', () => {
    const menuPrice = new MenuPrice(100);
    const drinkPrice = new DrinkPrice('short', menuPrice);
    expect(drinkPrice.equals(drinkPrice)).toBe(true);
  });

  test('not equals', () => {
    const menuPrice = new MenuPrice(100);
    const drinkPrice = new DrinkPrice('short', menuPrice);
    expect(drinkPrice.equals( new DrinkPrice('tall', menuPrice) )).toBe(false);
  });
});
