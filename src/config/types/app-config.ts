import { defaultMiniStockConfig, MiniStockConfig } from "./mini-stock-config";
import { defaultItemMatchConfig, ItemMatchConfig } from "./item-match-config";
import { defaultGeneralConfig, GeneralConfig } from "./GeneralConfig";
import { defaultHighlightConfig, HighlightConfig } from "./highlight-config";

export interface AppConfig {
  general: GeneralConfig;
  itemMatch: ItemMatchConfig;
  miniStock: MiniStockConfig;
  styles: HighlightConfig;
}

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
    styles: defaultHighlightConfig(),
  };
}
