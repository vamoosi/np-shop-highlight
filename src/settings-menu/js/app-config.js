import { writable } from "svelte/store"
import { defaultAppConfig } from "../../config/types/app-config";

/**
 * @type {Writable<AppConfig>}
 */
const staticConfig = writable(defaultAppConfig());

/**
 * @return {Writable<AppConfig>}
 */
export function getConfigStore() {
  return staticConfig;
}

/**
 * @param {AppConfig} conf
 */
export function setConfig(conf) {
  staticConfig.set(conf);
}

/**
 * @param {function(AppConfig):void} fn
 */
export function subscribe(fn) {
  staticConfig.subscribe(fn);
}