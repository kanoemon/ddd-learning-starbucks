import { DrinkSize } from "../../../../src/productmanagement/domain/model/DrinkSize";

describe('create a drink size', () => {
  test('equals', () => {
    const drinkSize = new DrinkSize('short');
    expect(drinkSize.equals(new DrinkSize('short'))).toBe(true);
  });

  test('not equals', () => {
    const drinkSize = new DrinkSize('short');
    expect(drinkSize.equals(new DrinkSize('tall'))).toBe(false);
  });
});
