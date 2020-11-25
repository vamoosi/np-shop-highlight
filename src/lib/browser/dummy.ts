/**
 * Dummy/test implementation of BrowserStore.
 */
import {
  BrowserStore,
  BrowserStoreCB,
  SubscriberMap,
} from "./browser-store";
import { Option } from "../option";

interface StoreResult<T> {
  [key: string]: T;
}

const subscribers: SubscriberMap = {};

function pushSubscriber(key: string, fn: BrowserStoreCB): void {
  if (subscribers.hasOwnProperty(key))
    subscribers[key].push(fn);
  else
    subscribers[key] = [ fn ];
}

function changeCB(data: StoreResult<any>): void {
  for (const key in data)
    if (data.hasOwnProperty(key) && subscribers.hasOwnProperty(key))
      for (const fn of subscribers[key])
        fn(data[key]);
}

const out: BrowserStore = {
  name: "Noop",

  loadLocal<T>(_key: string): Promise<Option<T>> {
    return Promise.resolve(Option.none());
  },

  subscribe(key: string | Array<string>, fn: BrowserStoreCB): void {
    const iter = Array.isArray(key) ? key : [ key ];
    for (const k of iter)
      pushSubscriber(k, fn);
  },

  saveLocal<T>(key: string, data: T): Promise<any> {
    changeCB({[key]: data});
    return Promise.resolve();
  },
};

export default out;