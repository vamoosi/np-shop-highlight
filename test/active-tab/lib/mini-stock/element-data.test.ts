import {
  ElementData,
  newElementData,
} from "../../../../src/active-tab/lib/mini-stock/element-data";


describe("newElementData", () => {
  test("does the thing", () => {
    const a = document.createElement("a");
    expect(newElementData(a, 10, 20))
      .toStrictEqual<ElementData>({tag: a, val: {stockId: 10, itemInfoId: 20}});
  });
});