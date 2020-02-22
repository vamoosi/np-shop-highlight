import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";
import { Option } from "../../../lib/option";
import Util from './util';
import Text from './text';


export default async function(links: NodeListOf<HTMLAnchorElement>): Promise<void> {
  const config = getConfig();
  console.log(links);

  for (const id of config.itemMatch.order) {
    const group = config.itemMatch.groups[id.toString()];

    console.log(group);

    if (!group.enabled)
      continue;

    const style = config.styles.values[group.styles[0].toString()];

    for (const item of group.items) {
      for (const link of links) {
        const td = link.parentElement;
        if (matches(td, item))
          applyStyle(style, td);
      }
    }
  }
}

/**
 * Matches the given text against the given node.
 */
function matches(node: HTMLElement | null, text: string): boolean {
  if (text === "") {
    return false;
  }

  const val = Option.maybe<HTMLElement>(node)
    .flatMap<string>(Util.getTitle)
    .orElse("");

  const wcl = Text.hasWildcardLeft(text);
  const wcr = Text.trimWildCard(text);
  const trm = wcl || wcr ? Text.trimWildCard(text) : text;

  let out = false;

  if (wcl)
    out = Text.matchWildCardLeft(val, trm);
  if (!out && wcr)
    out = Text.matchWildcardRight(val, trm);
  if (!out && !wcl && !wcr)
    out = val === trm;

  return out;
}