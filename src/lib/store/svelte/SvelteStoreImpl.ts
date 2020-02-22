import { AppConfig } from "../../../config/types/app-config";
import { Readable, writable, Writable } from "svelte/store";
import { lossyClone } from "../../util";
import Storage from "../static-store";
import { APP_CONFIG_KEY } from "../../../config/Constants";
import { debug, debugIn, debugOut, debugOutVoid, fatal } from "../../logging";
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

const out: ISvelteStore = {
  writableStore(): Writable<AppConfig> {
    debugIn(tag('out#writableStore'));
    if (!isInit())
      fatal(ERR_WRITE);

    return debugOut(tag('out#writableStore'), confWrite);
  },

  readableStore(): Readable<AppConfig> {
    debugIn(tag('out#readableStore'));
    if (!isInit())
      fatal(ERR_READ);

    return debugOut(tag("out#readableStore"), confRead);
  },

  get(...path: Array<string>): Option<any> {
    debugIn(tag('out#get'), {path});
    let current: any = liveConf;

    for (const i of path) {
      if (current.hasOwnProperty(i))
        current = current[i];
      else
        return debugOut(tag('out#get'), Option.none());
    }

    return debugOut(tag('out#get'), Option.maybe(current));
  }
};

export default out;

export function initConfigState(conf: AppConfig) {
  debugIn(tag("initConfigState"), {conf});
  if (isInit())
    fatal(ERR_REINIT);

  liveConf = conf;
  confWrite.set(conf);
  confRead.set(lossyClone(conf));
  lastState = JSON.stringify(conf);

  Storage.subscribe(APP_CONFIG_KEY, browserCB);
  confWrite.subscribe(confCB);
  debugOutVoid(tag("initConfigState"));
}

function browserCB(value: AppConfig): void {
  debugIn(tag("browserCB"), { value });
  confRead.set(value);
  debugOutVoid(tag("browserCB"));
}

function confCB(value: AppConfig): void {
  debugIn(tag("confCB"), {value});
  if (stateChanged(value)) {
    debug(tag("confCB"), "State changed.");
    Storage.saveLocal(APP_CONFIG_KEY, value)
      .catch(console.log);
  }
  debugOutVoid(tag("confCB"));
}

function stateChanged(value: AppConfig): boolean {
  debugIn(tag("stateChanged"), {value});
  const tmp = JSON.stringify(value);

  if (tmp === lastState)
    return debugOut(tag("stateChanged"), false);

  lastState = tmp;
  return debugOut(tag("stateChanged"), true);
}
