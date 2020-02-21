import {
  BrowserStore, BrowserStoreCB,
  SubscriberMap
} from "./browser-store";
import { Option } from "../option";
import { exists } from "../util";
import { debug } from "../logging";

interface StoreResult<T> {
  [key: string]: T;
}

const tag    = (n: string) => __filename + ':' + n;
const tagIn  = (n: string) => tag(n) + ".start";
const tagOut = (n: string) => tag(n) + ".stop";

const subscribers: SubscriberMap = {};

let initialized = false;

function init() {
  debug(tagIn("init"), null);
  if (initialized) {
    debug(tag("init"), "already initialized");
    debug(tagOut("init"), null);
    return;
  }

  debug(tag("init"), "initializing");
  chrome.storage.onChanged.addListener(changeCB);
  initialized = true;
  debug(tagOut("init"), null)
}

function pushSubscriber(key: string, fn: BrowserStoreCB): void {
  debug(tagIn("pushSubscriber"), [key, fn]);
  if (subscribers.hasOwnProperty(key))
    subscribers[key].push(fn);
  else
    subscribers[key] = [ fn ];
  debug(tagOut("pushSubscriber"), null);
}

function changeCB(data: StoreResult<any>): void {
  debug(tagIn("changeCB"), data);
  if (exists(data)) {
    for (const key in data) {
      if (data.hasOwnProperty(key) && subscribers.hasOwnProperty(key)) {
        for (const fn of subscribers[key]) {
          fn(data[key].newValue);
        }
      }
    }
  }

  debug(tagOut("changeCB"), null);
  return;
}

const out: BrowserStore = {
  name: "Chrome",

  subscribe(key: string | Array<string>, fn: BrowserStoreCB): void {
    debug(tagIn("Chrome#subscribe"), {key, fn});
    init();
    const iter = Array.isArray(key) ? key : [ key ];

    for (const k of iter)
      pushSubscriber(k, fn);

    debug(tagOut("Chrome#subscribe"), null);
  },

  saveLocal<T>(key: string, data: T): Promise<any> {
    debug(tagIn("Chrome#saveLocal"), {key, data});
    init();

    return debug(
      tagOut("Chrome#saveLocal"),
      new Promise(g => chrome.storage.local.set({ [key]: data }, g))
    );
  },

  loadLocal<T>(key: string): Promise<Option<T>> {
    debug(tagIn("Chrome#loadLocal"), {key});
    init();

    return debug(
      tagOut("Chrome#loadLocal"),
      new Promise<StoreResult<T>>(g => chrome.storage.local.get(key.toString(), g))
        .then(o => Option.maybe(o[key]))
    );
  }
};

export default out;
