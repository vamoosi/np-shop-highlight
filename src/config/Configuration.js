import { defaultAppConfig } from "./types/app-config";

let staticConfig = defaultAppConfig();

export function getConfig() {
  return staticConfig;
}

/**
 * @param {AppConfig} config
 */
export function setConfig(config) {
  staticConfig = config;
}