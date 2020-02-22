// TODO: Rename this file lol

import { BrowserStore, BrowserStoreCB } from "../browser/browser-store";
import { Option } from "../option";
import { exists } from "../util";
import ChromeStore from "../browser/chrome";
import DummyStore from "../browser/dummy";

const browser: BrowserStore = (exists(chrome) && exists(chrome.storage))
  ? ChromeStore
  : DummyStore;

const out: BrowserStore = {
  name: browser.name,

  loadLocal(key: string): Promise<Option<any>> {
    return browser.loadLocal(key);
  },

  saveLocal<T>(key: string, value: T): Promise<any> {
    return browser.saveLocal(key, value);
  },

  subscribe(key: string | Array<string>, fn: BrowserStoreCB): void {
    if (Array.isArray(key))
      browser.subscribe(key, fn);
    else
      browser.subscribe(key, fn);
  },
};

export default out;
