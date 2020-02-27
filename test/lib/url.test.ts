///<reference path="../../node_modules/@types/jest/index.d.ts"/>

import url from "../../src/lib/url"

describe("url.splitFragment", () => {
  test('rename me 1', () => {
    const exp = {foo: "bar", butts: ""};
    expect(url.splitFragment("#foo=bar;butts;;")).toEqual(exp);
  });

  test('rename me 2', () => {
    const exp = {};
    expect(url.splitFragment("")).toEqual(exp);
  });
});