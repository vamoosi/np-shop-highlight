import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";

/**
 * @param {NodeList} links
 * @return {Promise<void>}
 */
export async function handler(links) {
  const config = getConfig();
  const style  = config.styles.values[config.itemMatch.groups["1"].styles[0].toString()];
  for (const item of config.itemMatch.groups["1"].items) {
    for (const link of links) {
      const td = link.parentElement;
      if (td.textContent.indexOf(item) > -1)
        applyStyle(style, td);
    }
  }
}
