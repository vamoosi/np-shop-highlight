import { AppConfig, defaultAppConfig } from "./types/app-config";

let staticConfig: AppConfig = defaultAppConfig();

export function getConfig(): AppConfig {
  return staticConfig;
}

export function setConfig(config: AppConfig): void {
  staticConfig = config;
}
