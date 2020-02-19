/**
 * @typedef {object} AppConfig
 *
 * @property {GeneralConfig} general
 *     Global extension config.
 *
 * @property {ItemMatchConfig} itemMatch
 *
 * @property {MiniStockConfig} miniStock
 *     Configuration for the MicroStock component of this
 *     extension.
 *
 * @property {SettingsConfig} settingsMenu
 *     Configuration of the settings menu itself.
 *
 * @property {HighlightConfig} styles
 */

import { defaultMiniStockConfig } from "./mini-stock-config";
import { defaultItemMatchConfig } from "./item-match-config";
import { defaultGeneralConfig } from "./general-config";
import { defaultSettingsConfig } from "./settings-config";
import { defaultHighlightConfig } from "./highlight-config";

/**
 * Creates a defaulted extension configuration object.
 *
 * @returns {AppConfig}
 */
export function defaultAppConfig() {
  return {
    general: defaultGeneralConfig(),
    miniStock: defaultMiniStockConfig(),
    itemMatch: defaultItemMatchConfig(),
    settingsMenu: defaultSettingsConfig(),
    styles: defaultHighlightConfig(),
  };
}
