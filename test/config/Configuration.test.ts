///<reference path="../../node_modules/@types/jest/index.d.ts"/>

import { defaultAppConfig } from "../../src/config/types/app-config";
import { getConfig, setConfig } from "../../src/config/Configuration";

describe("Configuration", () => {
  test("1", () => {
    const a = defaultAppConfig();
    setConfig(a);
    expect(getConfig()).toStrictEqual(a);
  });
});