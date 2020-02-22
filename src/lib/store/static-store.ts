// TODO: Rename this file lol

import { BrowserStore, BrowserStoreCB } from "../browser/browser-store";
import { Option } from "../option";
import { exists } from "../util";
import ChromeStore from "../browser/chrome";
import DummyStore from "../browser/dummy";
import { debug, debugIn, debugOut, debugOutVoid } from "../logging";

const tag = (n: string) => __filename + ":" + n;

const browser: BrowserStore = (exists(chrome) && exists(chrome.storage))
  ? ChromeStore
  : DummyStore;

debug(__filename, "Using browser " + browser.name);

const out: BrowserStore = {
  name: browser.name,

  loadLocal(key: string): Promise<Option<any>> {
    debugIn(tag("BrowserStore#loadLocal"), {key});
    return debugOut(tag("BrowserStore#loadLocal"), browser.loadLocal(key));
  },

  saveLocal<T>(key: string, value: T): Promise<any> {
    debugIn(tag("BrowserStore#saveLocal"), { key, value });
    return debugOut(tag("BrowserStore"), browser.saveLocal(key, value));
  },

  subscribe(key: string | Array<string>, fn: BrowserStoreCB): void {
    debugIn(tag("BrowserStore#subscribe"), { key, fn });
    if (Array.isArray(key))
      browser.subscribe(key, fn);
    else
      browser.subscribe(key, fn);
    debugOutVoid(tag("BrowserStore#subscribe"));
  },
};

export default out;
