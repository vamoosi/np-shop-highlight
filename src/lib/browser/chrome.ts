import {
  BrowserStore, BrowserStoreCB,
  SubscriberMap,
} from "./browser-store";
import { Option } from "../option";
import { exists } from "../util";

interface StoreResult<T> {
  [key: string]: T;
}

const subscribers: SubscriberMap = {};

let initialized = false;

function init() {
  if (initialized)
    return;

  chrome.storage.onChanged.addListener(changeCB);
  initialized = true;
}

function pushSubscriber(key: string, fn: BrowserStoreCB): void {
  if (subscribers.hasOwnProperty(key))
    subscribers[key].push(fn);
  else
    subscribers[key] = [ fn ];
}

function changeCB(data: StoreResult<any>): void{
  if (exists(data))
    for (const key in data)
      if (data.hasOwnProperty(key) && subscribers.hasOwnProperty(key))
        for (const fn of subscribers[key])
          fn(data[key].newValue);
}

const out: BrowserStore = {
  name: "Chrome",

  subscribe(key: string | Array<string>, fn: BrowserStoreCB): void {
    init();
    const iter = Array.isArray(key) ? key : [ key ];

    for (const k of iter)
      pushSubscriber(k, fn);
  },

  saveLocal<T>(key: string, data: T): Promise<any> {
    init();

    return new Promise(g => chrome.storage.local.set({ [key]: data }, g));
  },

  loadLocal<T>(key: string): Promise<Option<T>> {
    init();

    return new Promise<StoreResult<T>>(g => chrome.storage.local.get(key.toString(), g))
      .then(o => Option.maybe(o[key]));
  },
};

export default out;
