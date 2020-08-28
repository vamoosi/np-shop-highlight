import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";

import Text from './text';
import { Option } from "../../../lib/option";

type DivMap = Map<string, HTMLDivElement>;

function buildMap(links: NodeListOf<HTMLDivElement>): DivMap
{
  // Map of whole titles to elements.
  const whole  = new Map<string, HTMLDivElement>();

  for (let i = 0; i < links.length; i++) {
    const item = links[i];
    const title = Option.maybe(item.querySelector<HTMLParagraphElement>(".item-name"))
      .map(v => v.innerText)
      .map(s => s.toLowerCase());
    if (title.isSome())
      whole.set(title.unwrap(), item);
  }

  return whole;
}

export default async function(links: NodeListOf<HTMLDivElement>): Promise<void> {
  const config = getConfig();
  const map = buildMap(links);

  for (const id of config.itemMatch.order) {
    const group = config.itemMatch.groups[id.toString()];

    if (!group.enabled)
      continue;

    const style = config.styles.values[group.styles[0].toString()];

    for (const item of group.items)
      for (const div of matches(item, map))
        applyStyle(style, div);
  }
}

/**
 * Matches the given text against the given node.
 *
 * @param text User defined pattern to match against.
 * @param maps
 */
function matches(text: string, maps: Map<string, HTMLDivElement>): Array<HTMLDivElement> {
  if (text === "")
    return [];

  text = Text.expandWildcard(text.toLowerCase());

  let out: Array<HTMLDivElement> = [];

  for (const title of maps.keys())
    if (text == title || new RegExp(text).test(title))
      out.push(<HTMLDivElement> maps.get(title));

  return out;
}