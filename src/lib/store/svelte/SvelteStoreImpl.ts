import { AppConfig } from "../../../config/types/app-config";
import { Readable, writable, Writable } from "svelte/store";
import { lossyClone } from "../../util";
import Storage from "../static-store";
import { APP_CONFIG_KEY } from "../../../config/Constants";
import { debug, fatal } from "../../logging";
import { Option } from "../../option";
import ISvelteStore from "./ISvelteStore";

const ERR_READ = "Attempted to load readable store before it was initialized";
const ERR_WRITE = "Attempted to load writable store before it was initialized";
const ERR_REINIT = "Configuration store already initialized";

const confWrite: Writable<AppConfig> = writable(<AppConfig>{});
const confRead:  Writable<AppConfig> = writable(<AppConfig>{});

let liveConf:  AppConfig;
let lastState: string = "";

const isInit = () => lastState !== "";
const tag = (n: string) => __filename + ":" + n;
const tagIn = (n: string) => tag(n) + ".start";
const tagOut = (n: string) => tag(n) + ".stop";

const out: ISvelteStore = {
  writableStore(): Writable<AppConfig> {
    debug(tagIn('out#writableStore'), null);
    if (!isInit())
      fatal(ERR_WRITE);

    return debug(tagOut('out#writableStore'), confWrite);
  },

  readableStore(): Readable<AppConfig> {
    debug(tagIn('out#readableStore'), null);
    if (!isInit())
      fatal(ERR_READ);

    return debug(tagOut("out#readableStore"), confRead);
  },

  get(...path: Array<string>): Option<any> {
    debug(tagIn('out#get'), {path});
    let current: any = liveConf;

    for (const i of path) {
      if (current.hasOwnProperty(i))
        current = current[i];
      else
        return debug(tagOut('out#get'), Option.none());
    }

    return debug(tagOut('out#get'), Option.maybe(current));
  }
};

export default out;

export function initConfigState(conf: AppConfig) {
  debug(tagIn(initConfigState.name), {conf});
  if (isInit())
    fatal(ERR_REINIT);

  liveConf = conf;
  confWrite.set(conf);
  confRead.set(lossyClone(conf));
  lastState = JSON.stringify(conf);

  Storage.subscribe(APP_CONFIG_KEY, browserCB);
  confWrite.subscribe(confCB);
  debug(tagOut(initConfigState.name), null);
}

function browserCB(value: AppConfig): void {
  debug(tagIn("browserCB"), { value });
  confRead.set(value);
  debug(tagOut("browserCB"), null);
}

function confCB(value: AppConfig): void {
  debug(tagIn(confCB.name), {value});
  if (stateChanged(value)) {
    debug(tag(confCB.name), "State changed.");
    Storage.saveLocal(APP_CONFIG_KEY, value)
      .catch(console.log);
  }
  debug(tagOut(confCB.name), null);
}

function stateChanged(value: AppConfig) {
  debug(tagIn(stateChanged.name), {value});
  const tmp = JSON.stringify(value);

  if (tmp === lastState)
    return debug(tagOut(stateChanged.name), false);

  lastState = tmp;
  return debug(tagOut(stateChanged.name), true);
}
