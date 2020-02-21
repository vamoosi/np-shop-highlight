import {
  BrowserStore, BrowserStoreCB,
  SubscriberMap,
} from "./browser-store";
import { Option } from "../option";
import { debug } from "../logging";

const tag = (n: string) => __filename + ":" + n;
const tagIn = (n: string) => tag(n) + ".start";
const tagOut = (n: string) => tag(n) + ".stop";

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
  debug(tagIn("changeCB"), data);
  for (const key in data) {
    if (data.hasOwnProperty(key) && subscribers.hasOwnProperty(key)) {
      for (const fn of subscribers[key]) {
        debug(tag("changeCB.fn"), [ key, fn ]);
        fn(data);
      }
    }
  }
  debug(tagOut("changeCB"), null);
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

  saveLocal<T>(_key: string, data: T): Promise<any> {
    changeCB(data);
    return Promise.resolve();
  },
};

export default out;