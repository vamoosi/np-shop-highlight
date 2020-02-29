///<reference path="../../node_modules/@types/jest/index.d.ts"/>

import { applyStyle } from "../../src/lib/style";
import { newHighlightStyle } from "../../src/config/types/highlight-style";

describe("applyStyle", () => {
  test("1", () => {
    const e = document.createElement("a");
    const s = newHighlightStyle(1, "", "#333", "#aaa", 50);
    applyStyle(s, e);

    expect(e.style.backgroundColor).toStrictEqual("rgb(51, 51, 51)");
    expect(e.style.color).toStrictEqual("rgb(170, 170, 170)");
    expect(e.style.getPropertyValue("opacity")).toStrictEqual("0.5");
  });

  test("2", () => {
    const s = newHighlightStyle(1, "", "#333", "#aaa", 50);
    expect(() => applyStyle(s, null)).not.toThrow();
  });

  test("3", () => {
    const e = document.createElement("a");
    const s = newHighlightStyle(1, "", undefined, undefined, 40);
    applyStyle(s, e);

    expect(e.style.backgroundColor).toStrictEqual("rgb(255, 255, 255)");
    expect(e.style.color).toStrictEqual("rgb(0, 0, 0)");
    expect(e.style.opacity).toStrictEqual("0.4");
  });


  test("3", () => {
    const e = document.createElement("a");
    const s = newHighlightStyle(1, "", "red");
    applyStyle(s, e);

    expect(e.style.backgroundColor).toStrictEqual("red");
    expect(e.style.color).toStrictEqual("rgb(0, 0, 0)");
    expect(e.style.opacity).toStrictEqual("1");
  });
});
