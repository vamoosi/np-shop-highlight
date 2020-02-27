///<reference path="../../node_modules/@types/jest/index.d.ts"/>

import { arrayOmit, arrayUniq } from "../../src/lib/util";

test("1", () => {
  const i = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const o = [1, 2, 4, 5, 6, 7, 8, 9];
  expect(arrayOmit(i, 3)).toStrictEqual(o);
});

test("2", () => {
  const i = ["a", "b", "c", "a", "c", "d", "b", "d", "e"];
  const o = ["a", "b", "c", "d", "e"];
  expect(arrayUniq(i)).toStrictEqual(o);
});