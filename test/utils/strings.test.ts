///<reference path="../../node_modules/@types/jest/index.d.ts"/>
import strings from "../../src/lib/strings";

describe("trimLeft", () => {
  describe("returns an empty string", () => {
    test("when given an empty target", () => {
      expect(strings.trimLeft("", " ")).toEqual("");
    });
    test("when the entire target matches the trim character", () => {
      expect(strings.trimLeft("cccccccccc", "c")).toEqual("");
    });
  });

  describe("returns the target string unchanged", () => {
    test("when the trim character is empty", () => {
      const target = "foo";
      expect(strings.trimLeft(target, "")).toEqual(target);
    });

    test("when the trim character is not in the input string", () => {
      const target = "dddddddd";
      expect(strings.trimLeft(target, "e")).toEqual(target);
    });

    test("when the trim character isn't on the left side of the target", () => {
      const targets = ["foo#", "f#oo"];
      const char = "#";

      for (const tgt of targets)
        expect(strings.trimLeft(tgt, char)).toEqual(tgt);
    });
  });

  describe("returns the target string without the trim character", () => {
    test("when the trim character appears on the left side of the string", () => {
      const targets = ["#foo", "##foo", "########foo"];
      const exp     = "foo";
      const char    = "#";

      for (const tgt of targets)
        expect(strings.trimLeft(tgt, char)).toEqual(exp);
    });
  });
});

describe("trimRight", () => {
  describe("returns an empty string", () => {
    test("when given an empty target", () => {
      expect(strings.trimRight("", " ")).toEqual("");
    });
    test("when the entire target matches the trim character", () => {
      expect(strings.trimRight("cccccccccc", "c")).toEqual("");
    });
  });

  describe("returns the target string unchanged", () => {
    test("when the trim character is empty", () => {
      const target = "foo";
      expect(strings.trimRight(target, "")).toEqual(target);
    });

    test("when the trim character is not in the input string", () => {
      const target = "dddddddd";
      expect(strings.trimRight(target, "e")).toEqual(target);
    });

    test("when the trim character isn't on the right side of the target", () => {
      const targets = ["#foo", "f#oo"];
      const char = "#";

      for (const tgt of targets)
        expect(strings.trimRight(tgt, char)).toEqual(tgt);
    });
  });

  describe("returns the target string without the trim character", () => {
    test("when the trim character appears on the right side of the string", () => {
      const targets = ["foo#", "foo##", "foo########"];
      const exp     = "foo";
      const char    = "#";

      for (const tgt of targets)
        expect(strings.trimRight(tgt, char)).toEqual(exp);
    });
  });
});

describe("trim", () => {
  describe("returns an empty string", () => {
    test("when given an empty target", () => {
      expect(strings.trim("", " ")).toEqual("");
    });
    test("when the entire target matches the trim character", () => {
      expect(strings.trim("cccccccccc", "c")).toEqual("");
    });
  });

  describe("returns the target string unchanged", () => {
    test("when the trim character is empty", () => {
      const target = "foo";
      expect(strings.trim(target, "")).toEqual(target);
    });

    test("when the trim character is not in the input string", () => {
      const target = "dddddddd";
      expect(strings.trim(target, "e")).toEqual(target);
    });

    test("when the trim character isn't on either end of the target", () => {
      const targets = ["fo#o", "f#oo"];
      const char = "#";

      for (const tgt of targets)
        expect(strings.trim(tgt, char)).toEqual(tgt);
    });
  });

  describe("returns the target string without the trim character", () => {
    test("when the trim character appears on one or more sides of the string", () => {
      const targets = ["foo#", "foo##", "foo########", "#foo", "##foo", "########foo", "#foo#", "##foo##", "########foo########"];
      const exp     = "foo";
      const char    = "#";

      for (const tgt of targets)
        expect(strings.trim(tgt, char)).toEqual(exp);
    });
  });
});
