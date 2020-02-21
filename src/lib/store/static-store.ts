// TODO: Rename this file lol

import { BrowserStore, BrowserStoreCB } from "../browser/browser-store";
import { Option } from "../option";
import { exists } from "../util";
import ChromeStore from "../browser/chrome";
import DummyStore from "../browser/dummy";
import { debug } from "../logging";

const tag    = (n: string) => __filename + ':' + n;
const tagIn  = (n: string) => tag(n) + ".start";
const tagOut = (n: string) => tag(n) + ".stop";

const browser: BrowserStore = (exists(chrome) && exists(chrome.storage))
  ? ChromeStore
  : DummyStore;

debug(__filename, "Using browser " + browser.name);

const out: BrowserStore = {
  name: browser.name,

  loadLocal(key: string): Promise<Option<any>> {
    debug(tagIn("BrowserStore#loadLocal"), key);
    return debug(tagOut("BrowserStore#loadLocal"), browser.loadLocal(key));
  },

  saveLocal<T>(key: string, value: T): Promise<any> {
    debug(tagIn("BrowserStore#saveLocal"), { key, value });
    return debug(tagOut("BrowserStore"), browser.saveLocal(key, value));
  },

  subscribe(key: string | Array<string>, fn: BrowserStoreCB): void {
    debug(tagIn("BrowserStore#subscribe"), {key,fn});
    if (Array.isArray(key))
      browser.subscribe(key, fn);
    else
      browser.subscribe(key, fn);
    debug(tagOut("BrowserStore#subscribe"), null);
  }
};

export default out;
