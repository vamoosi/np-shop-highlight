import {
  BrowserStore, BrowserStoreCB,
  SubscriberMap,
} from "./browser-store";
import { Option } from "../option";
import { exists } from "../util";
import { debug, debugIn, debugOut, debugOutVoid } from "../logging";

interface StoreResult<T> {
  [key: string]: T;
}

const tag = (n: string) => __filename + ":" + n;

const subscribers: SubscriberMap = {};

let initialized = false;

function init() {
  debugIn(tag("init"));
  if (initialized) {
    debug(tag("init"), "already initialized");
    debugOutVoid(tag("init"));
    return;
  }

  debug(tag("init"), "initializing");
  chrome.storage.onChanged.addListener(changeCB);
  initialized = true;
  debugOutVoid(tag("init"));
}

function pushSubscriber(key: string, fn: BrowserStoreCB): void {
  debugIn(tag("pushSubscriber"), { key, fn });
  if (subscribers.hasOwnProperty(key))
    subscribers[key].push(fn);
  else
    subscribers[key] = [ fn ];
  debugOutVoid(tag("pushSubscriber"));
}

function changeCB(data: StoreResult<any>): void {
  debugIn(tag("changeCB"), data);
  if (exists(data)) {
    for (const key in data) {
      if (data.hasOwnProperty(key) && subscribers.hasOwnProperty(key)) {
        for (const fn of subscribers[key]) {
          fn(data[key].newValue);
        }
      }
    }
  }

  debugOutVoid(tag("changeCB"));
  return;
}

const out: BrowserStore = {
  name: "Chrome",

  subscribe(key: string | Array<string>, fn: BrowserStoreCB): void {
    debugIn(tag("Chrome#subscribe"), { key, fn });
    init();
    const iter = Array.isArray(key) ? key : [ key ];

    for (const k of iter)
      pushSubscriber(k, fn);

    debugOutVoid(tag("Chrome#subscribe"));
  },

  saveLocal<T>(key: string, data: T): Promise<any> {
    debugIn(tag("Chrome#saveLocal"), { key, data });
    init();

    return debugOut(
      tag("Chrome#saveLocal"),
      new Promise(g => chrome.storage.local.set({ [key]: data }, g)),
    );
  },

  loadLocal<T>(key: string): Promise<Option<T>> {
    debugIn(tag("Chrome#loadLocal"), { key });
    init();

    return debugOut(
      tag("Chrome#loadLocal"),
      new Promise<StoreResult<T>>(g => chrome.storage.local.get(key.toString(), g))
        .then(o => Option.maybe(o[key])),
    );
  },
};

export default out;
