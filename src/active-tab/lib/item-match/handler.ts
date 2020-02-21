import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";

export async function handler(links: NodeListOf<HTMLAnchorElement>): Promise<void> {
  const config = getConfig();
  const style  = config.styles.values[config.itemMatch.groups["1"].styles[0].toString()];
  for (const item of config.itemMatch.groups["1"].items) {
    for (const link of links) {
      const td = link.parentElement;
      if (matches(td, item))
        applyStyle(style, td);
    }
  }
}

/**
 * Matches the given text against the given node.
 */
function matches(node: HTMLElement | null, text: string): boolean {
  return node !== null
    && node.textContent !== null
    && node.textContent.indexOf(text) > -1;
}