///<reference path="../../node_modules/@types/jest/index.d.ts"/>

import { Option as O } from '../../src/lib/option'

describe("Option", () => {
  test("rename me 1", () => {
    const tst = O.maybe<boolean>();
    expect(tst.isNone()).toStrictEqual(true);
    expect(tst.isSome()).toStrictEqual(false);
    expect(tst.orElse(true)).toStrictEqual(true);
    expect(tst.orElseGet(() => true)).toStrictEqual(true);

    let a = 0, b = 0;
    let out = false;
    tst.ifNone(() => {a++});
    tst.ifSome((v) => {out = v; b++;});

    expect(a).toStrictEqual(1);
    expect(b).toStrictEqual(0);
    expect(out).toStrictEqual(false);
    expect(() => {tst.unwrap()}).toThrow();
    expect(() => {tst.orElseGet(<() => boolean>{})}).toThrow();
  });

  test("rename me 2", () => {
    const tst = O.none<boolean>();
    expect(tst.isNone()).toStrictEqual(true);
    expect(tst.isSome()).toStrictEqual(false);
    expect(tst.orElse(true)).toStrictEqual(true);
    expect(tst.orElseGet(() => true)).toStrictEqual(true);

    let a = 0, b = 0;
    let out = false;
    tst.ifNone(() => {a++});
    tst.ifSome((v) => {out = v; b++;});

    expect(a).toStrictEqual(1);
    expect(b).toStrictEqual(0);
    expect(out).toStrictEqual(false);
    expect(() => {tst.unwrap()}).toThrow();
    expect(() => {tst.orElseGet(<() => boolean>{})}).toThrow();
  });

  test("rename me 3", () => {
    const tst = O.some("test");
    expect(tst.isNone()).toStrictEqual(false);
    expect(tst.isSome()).toStrictEqual(true);
    expect(tst.orElse("butts")).toStrictEqual("test");
    expect(tst.orElseGet(() => "nasty")).toStrictEqual("test");
    expect(() => O.some<undefined>(undefined)).toThrow();

    let a = 0, b = 0;
    let out = "honk";
    tst.ifNone(() => {a++});
    tst.ifSome((v) => {out = v; b++;});

    expect(a).toStrictEqual(0);
    expect(b).toStrictEqual(1);
    expect(out).toStrictEqual("test");
    expect(tst.unwrap()).toStrictEqual("test");
    expect(() => {tst.orElseGet(<() => string>{})}).toThrow();
  });

  test("rename me 4", () => {
    const tst = O.maybe("test");
    expect(tst.isNone()).toStrictEqual(false);
    expect(tst.isSome()).toStrictEqual(true);
    expect(tst.orElse("butts")).toStrictEqual("test");
    expect(tst.orElseGet(() => "nasty")).toStrictEqual("test");
    expect(() => O.some<undefined>(undefined)).toThrow();

    let a = 0, b = 0;
    let out = "honk";
    tst.ifNone(() => {a++});
    tst.ifSome((v) => {out = v; b++;});

    expect(a).toStrictEqual(0);
    expect(b).toStrictEqual(1);
    expect(out).toStrictEqual("test");
    expect(tst.unwrap()).toStrictEqual("test");
    expect(() => {tst.orElseGet(<() => string>{})}).toThrow();
  });

  test("rename me 5", () => {
    const tst = O.maybe<boolean>().map((_) => "");
    expect(tst.isNone()).toStrictEqual(true);
    expect(tst.isSome()).toStrictEqual(false);
  });

  test("rename me 6", () => {
    const tst = O.maybe(3).map((_) => "");
    expect(tst.isNone()).toStrictEqual(false);
    expect(tst.isSome()).toStrictEqual(true);
    expect(tst.unwrap()).toStrictEqual("");
  });
});