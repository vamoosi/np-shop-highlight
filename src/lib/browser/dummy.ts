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
  debug(tagIn(pushSubscriber.name), {key, fn});
  if (subscribers.hasOwnProperty(key))
    subscribers[key].push(fn);
  else
    subscribers[key] = [ fn ];
  debug(tagOut(pushSubscriber.name), null);
}


function changeCB(data: StoreResult<any>): void {
  debug(tagIn("changeCB"), data);
  for (const key in data) {
    if (data.hasOwnProperty(key) && subscribers.hasOwnProperty(key)) {
      for (const fn of subscribers[key]) {
        debug(tag("changeCB.fn"), [ key, fn ]);
        fn(data[key]);
      }
    }
  }
  debug(tagOut("changeCB"), null);
}

const out: BrowserStore = {
  name: "Noop",

  loadLocal<T>(key: string): Promise<Option<T>> {
    debug(tagIn('out.loadLocal'), {key});
    return debug(tagOut('out.loadLocal'), Promise.resolve(Option.none()));
  },

  subscribe(key: string | Array<string>, fn: BrowserStoreCB): void {
    debug(tagIn('out.subscribe'), {key, fn});
    const iter = Array.isArray(key) ? key : [ key ];
    for (const k of iter)
      pushSubscriber(k, fn);

    debug(tagOut('out.subscribe'), null);
  },

  saveLocal<T>(key: string, data: T): Promise<any> {
    debug(tagIn('out.saveLocal'), {key, data});
    changeCB({[key]: data});
    return debug(tagOut('out.saveLocal'), Promise.resolve());
  },
};

export default out;