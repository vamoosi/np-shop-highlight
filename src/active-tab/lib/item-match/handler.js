import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";

/**
 * @param {NodeList} links
 *
 * @return {Promise<void>}
 */
export async function handler(links) {
  const config = getConfig();
  const style  = config.styles.values[config.itemMatch.groups["1"].styles[0].toString()];
  for (const item of config.itemMatch.groups["1"].items) {
    for (const link of links) {
      const td = link.parentElement;
      if (matches(td, text))
        applyStyle(style, td);
    }
  }
}

/**
 * Matches the given text against the given node.
 *
 * @param {HTMLElement} node
 * @param {string} text
 *
 * @return {boolean}
 */
function matches(node, text) {
  return node.textContent.indexOf(text) > -1;
}