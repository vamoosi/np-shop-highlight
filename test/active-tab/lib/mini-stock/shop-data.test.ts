import {
  newShopData,
  ShopData,
} from "../../../../src/active-tab/lib/mini-stock/shop-data";
import { newItemDetails } from "../../../../src/active-tab/lib/mini-stock/item-details";


describe("newShopData", () => {
  test("does the thing", () => {
    const fresh = [newItemDetails(10, 20)];
    const stale = [newItemDetails(30, 40)];
    const time  = 1234;
    expect(newShopData(fresh, stale, time))
      .toStrictEqual<ShopData>({fresh, stale, time});
  });
});