import { AppConfig } from "../../../config/types/app-config";
import { Readable, writable, Writable } from "svelte/store";
import { lossyClone } from "../../util";
import Storage from "../static-store";
import { APP_CONFIG_KEY } from "../../../config/Constants";
import { Option } from "../../option";
import ISvelteStore, { SvelteSubscriber } from "./ISvelteStore";

const ERR_READ = "Attempted to load readable store before it was initialized";
const ERR_WRITE = "Attempted to load writable store before it was initialized";
const ERR_REINIT = "Configuration store already initialized";

const confWrite: Writable<AppConfig> = writable(<AppConfig>{});
const confRead:  Writable<AppConfig> = writable(<AppConfig>{});

const subscriberMap = new Map<number, SvelteSubscriber>();

let subscriberId = 0;
let liveConf:  AppConfig;
let lastState: string = "";

const isInit = () => lastState !== "";

confRead.subscribe(handleSubscribers);

const out: ISvelteStore = {
  writableStore(): Writable<AppConfig> {
    if (!isInit())
      throw new Error(ERR_WRITE);

    return confWrite;
  },

  readableStore(): Readable<AppConfig> {
    if (!isInit())
      throw new Error(ERR_READ);

    return confRead;
  },

  get(...path: Array<string>): Option<any> {
    let current: any = liveConf;

    for (const i of path) {
      if (current.hasOwnProperty(i))
        current = current[i];
      else
        return Option.none();
    }

    return Option.maybe(current);
  },

  // TODO: this is likely called asynchronously.  That may
  //       be an issue.  Introduce a lock here at some point
  subscribe(cb: SvelteSubscriber): number {
    subscriberMap.set(++subscriberId, cb);
    return subscriberId;
  },

  unsubscribe(handle: number): void {
    subscriberMap.delete(handle);
  }
};

export default out;

export function initConfigState(conf: AppConfig) {
  if (isInit())
    throw new Error(ERR_REINIT);

  liveConf = conf;
  confWrite.set(conf);
  confRead.set(lossyClone(conf));
  lastState = JSON.stringify(conf);

  Storage.subscribe(APP_CONFIG_KEY, browserCB);
  confWrite.subscribe(confCB);
}

function browserCB(value: AppConfig): void {
  confRead.set(value);
}

function confCB(value: AppConfig): void {
  if (stateChanged(value))
    Storage.saveLocal(APP_CONFIG_KEY, value)
      .catch(console.log);
}

function stateChanged(value: AppConfig): boolean {
  const tmp = JSON.stringify(value);

  if (tmp === lastState)
    return false;

  lastState = tmp;
  return true;
}

function handleSubscribers(a: AppConfig) {
  for (const cb of subscriberMap.values())
    // (async () => {cb(a)})();
    cb(a);
}
