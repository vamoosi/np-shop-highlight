import { getConfig } from "../../../config/Configuration";

import Text from './text';
import { ItemRef, ItemRefMap } from "../../../lib/dom/item-ref";

type RefMap = Map<string, ItemRef>;

function buildMap(links: ItemRefMap): RefMap
{
  // Map of whole titles to elements.
  const whole  = new Map<string, ItemRef>();

  for (const key of Object.keys(links)) {
    if (links.hasOwnProperty(key)) {
      whole.set(links[key].name.toLowerCase(), links[key]);
    }
  }

  return whole;
}

export default async function(links: ItemRefMap): Promise<void> {
  const config = getConfig();
  const map = buildMap(links);

  for (const id of config.itemMatch.order) {
    const group = config.itemMatch.groups[id.toString()];

    if (!group.enabled)
      continue;

    const style = config.styles.values[group.styles[0].toString()];

    for (const item of group.items)
      for (const ref of matches(item, map))
        ref.applyStyle(style);
  }
}

/**
 * Matches the given text against the given node.
 *
 * @param text User defined pattern to match against.
 * @param maps
 */
function matches(text: string, maps: RefMap): Array<ItemRef> {
  if (text === "")
    return [];

  text = Text.expandWildcard(text.toLowerCase());
  console.log(text);

  let out: Array<ItemRef> = [];

  for (const title of maps.keys()) {
    if (text == title || new RegExp(text).test(title))
      out.push(<ItemRef>maps.get(title));
  }

  return out;
}