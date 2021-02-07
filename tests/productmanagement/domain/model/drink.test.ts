import { Drink } from "../../../../src/productmanagement/domain/model/Drink";
import { DrinkId } from "../../../../src/productmanagement/domain/model/DrinkId";

describe('create drink object', () => {
  test('equals', () => {
    const drink = new Drink(
      new DrinkId(1),
      'coffee'
    );
    expect(drink.equals( new Drink( new DrinkId(1), 'tea' ) )).toBe(true);
  });
});