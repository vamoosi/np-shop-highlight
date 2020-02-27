import {
  ItemDetails,
  newItemDetails,
} from "../../../../src/active-tab/lib/mini-stock/item-details";


describe("newItemDetails", () => {
  test("does the thing", () => {
    expect(newItemDetails(10, 20))
      .toStrictEqual<ItemDetails>({stockId: 10, itemInfoId: 20});
  });
});