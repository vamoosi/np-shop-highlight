
import D from '../../../src/lib/browser/dummy';

describe("Dummy Browser", () => {
  describe("loadLocal", () => {
    test("should return an empty option", () => {
      D.loadLocal("").then(v => expect(v.isNone()).toStrictEqual(true));
    });
  });
  describe('saveLocal', () => {
    test("should return a promise of void", () => {
      D.saveLocal("", "").then(v => expect(v).toBeUndefined());
    });
    test("should call subscribers with the input value", () => {
      let val: any = "";
      const cb = (a: any): void => {val = a};
      D.subscribe("test", cb);
      D.saveLocal("test", "tester");
      expect(val).toStrictEqual("tester");
    });
  });
  describe("subscribers", () => {
    test("should all be called for their registered event", () => {
      let a: any = 0;
      let b: any = 0;

      D.subscribe("foo", v => {a = v});
      D.subscribe("foo", v => {b = v});
      D.saveLocal("foo", "bar");

      expect(a).toStrictEqual("bar");
      expect(b).toStrictEqual("bar");
    });


  });
});