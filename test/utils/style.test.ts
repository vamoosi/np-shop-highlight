///<reference path="../../node_modules/@types/jest/index.d.ts"/>

import { applyStyle } from "../../src/lib/style";
import { newHighlightStyle } from "../../src/config/types/highlight-style";

test("1", () => {
  const e = document.createElement("a");
  const s = newHighlightStyle(1, "", "#333", "#aaa", 50);
  applyStyle(s, e);

  expect(e.style.backgroundColor).toStrictEqual("rgb(51, 51, 51)");
  expect(e.style.color).toStrictEqual("rgb(170, 170, 170)");
  expect(e.style.opacity).toStrictEqual("0.5");
});