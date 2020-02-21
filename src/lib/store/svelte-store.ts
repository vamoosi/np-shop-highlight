import { AppConfig } from "../../config/types/app-config";
import { Readable, writable, Writable } from "svelte/store";
import { lossyClone } from "../util";
import Storage from "./static-store";
import { APP_CONFIG_KEY } from "../../config/Constants";
import { debug } from "../logging";

const ERR_READ   = "Attempted to load readable store before it was initialized";
const ERR_WRITE  = "Attempted to load writable store before it was initialized";
const ERR_REINIT = "Configuration store already initialized";

const confWrite: Writable<AppConfig> = writable(<AppConfig>{});
const confRead: Writable<AppConfig> = writable(<AppConfig>{});
let lastState: string = '';

const isInit = () => lastState !== '';
const tag    = (n: string) => __filename + ':' + n;
const tagIn  = (n: string) => tag(n) + ".start";
const tagOut = (n: string) => tag(n) + ".stop";


export function initConfigState(conf: AppConfig) {
  if (isInit())
    throw new Error(ERR_REINIT);

  confWrite.set(conf);
  confRead.set(lossyClone(conf));
  lastState = JSON.stringify(conf);

  Storage.subscribe(APP_CONFIG_KEY, browserCB);
  confWrite.subscribe(confCB);
}

export function writableStore(): Writable<AppConfig> {
  if (!isInit())
    throw new Error(ERR_WRITE);

  return confWrite;
}

export function readableStore(): Readable<AppConfig> {
  if (!isInit())
    throw new Error(ERR_READ);

  return confRead;
}

function browserCB(value: AppConfig): void {
  debug(tagIn("browserCB"), {value});
  confRead.set(value);
  debug(tagOut("browserCB"), null);
}

function confCB(value: AppConfig): void {
  if (stateChanged(value)) {
    Storage.saveLocal(APP_CONFIG_KEY, value)
      .catch(console.log);
  }
}

function stateChanged(value: AppConfig) {
  const tmp = JSON.stringify(value);

  if (tmp === lastState)
    return false;

  lastState = tmp;
  return true;
}
