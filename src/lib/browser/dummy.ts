import {
  BrowserStore, BrowserStoreCB,
  SubscriberMap,
} from "./browser-store";
import { Option } from "../option";
import { debug, debugIn, debugOut, debugOutVoid } from "../logging";

const tag = (n: string) => __filename + ":" + n;

interface StoreResult<T> {
  [key: string]: T;
}

const subscribers: SubscriberMap = {};

function pushSubscriber(key: string, fn: BrowserStoreCB): void {
  debugIn(tag(pushSubscriber.name), {key, fn});
  if (subscribers.hasOwnProperty(key))
    subscribers[key].push(fn);
  else
    subscribers[key] = [ fn ];
  debugOutVoid(tag(pushSubscriber.name));
}


function changeCB(data: StoreResult<any>): void {
  debugIn(tag("changeCB"), data);
  for (const key in data) {
    if (data.hasOwnProperty(key) && subscribers.hasOwnProperty(key)) {
      for (const fn of subscribers[key]) {
        debug(tag("changeCB.fn"), [ key, fn ]);
        fn(data[key]);
      }
    }
  }
  debugOutVoid(tag("changeCB"));
}

const out: BrowserStore = {
  name: "Noop",

  loadLocal<T>(key: string): Promise<Option<T>> {
    debugIn(tag('out.loadLocal'), {key});
    return debugOut(tag('out.loadLocal'), Promise.resolve(Option.none()));
  },

  subscribe(key: string | Array<string>, fn: BrowserStoreCB): void {
    debugIn(tag('out.subscribe'), {key, fn});
    const iter = Array.isArray(key) ? key : [ key ];
    for (const k of iter)
      pushSubscriber(k, fn);

    debugOutVoid(tag('out.subscribe'));
  },

  saveLocal<T>(key: string, data: T): Promise<any> {
    debugIn(tag('out.saveLocal'), {key, data});
    changeCB({[key]: data});
    return debugOut(tag('out.saveLocal'), Promise.resolve());
  },
};

export default out;