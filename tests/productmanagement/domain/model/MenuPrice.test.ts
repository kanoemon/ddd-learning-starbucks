import { MenuPrice } from "../../../../src/productmanagement/domain/model/MenuPrice";

describe('create a menu price', () => {
  test('equals', () => {
    const menuPrice: MenuPrice = new MenuPrice(100);
    expect(menuPrice.equals( new MenuPrice( 100 ))).toBe(true);
  });

  test('not equals', () => {
    const menuPrice: MenuPrice = new MenuPrice(100);
    expect(menuPrice.equals( new MenuPrice( 101 ))).toBe(false);
  });
});
