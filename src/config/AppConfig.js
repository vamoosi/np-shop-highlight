/**
 * @typedef {object} AppConfig
 *
 * @property {GeneralConfig} general
 *     Global extension config.
 *
 * @property {MicroStockConfig} microStock
 *     Configuration for the MicroStock component of this
 *     extension.
 *
 * @property {SettingsConfig} settingsMenu
 *     Configuration of the settings menu itself.
 */

import { defaultMicroStockConfig } from "./MicroStockConfig";
import { defaultItemMatchConfig } from "./ItemMatchConfig";
import { defaultGeneralConfig } from "./GeneralConfig";
import { defaultSettingsConfig } from "./SettingsConfig";

/**
 * Creates a defaulted extension configuration object.
 *
 * @returns {AppConfig}
 */
export function defaultAppConfig() {
  return {
    general: defaultGeneralConfig(),
    microStock: defaultMicroStockConfig(),
    itemMatch: defaultItemMatchConfig(),
    settingsMenu: defaultSettingsConfig()
  };
}
