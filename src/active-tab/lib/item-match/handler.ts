import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";

import Util from './util';
import Text from './text';

type Waka = Map<string, Array<HTMLTableDataCellElement>>;
type WakaWaka = {front: Waka, back: Waka, middle: Waka, whole: Waka};

function buildMaps(links: NodeListOf<HTMLAnchorElement>): WakaWaka
{
  const front  = new Map<string, Array<HTMLTableDataCellElement>>();
  const back   = new Map<string, Array<HTMLTableDataCellElement>>();
  const middle = new Map<string, Array<HTMLTableDataCellElement>>();
  const whole  = new Map<string, Array<HTMLTableDataCellElement>>();

  for (let i = 0; i < links.length; i++) {
    const a = links[i];

    // @ts-ignore
    const td: HTMLTableDataCellElement = a.parentElement;
    const title = Util.getTitle(td).unwrap();

    pushArray(whole, title, td);

    let f = title.length;
    let b = 0;
    const pos = new Set([b, f-1]);

    while (f > -1) {
      f = title.lastIndexOf(' ', f - 1);
      b = title.indexOf(' ', b + 1);
      if (f > -1) {
        pos.add(f);
        pos.add(b);
      }

      pushArray(front, title.substring(0, f), td);
      pushArray(back, title.substring(b + 1), td);
    }

    if (pos.size === 2)
      continue;

    for (const start of pos.values())
      for (const end of pos.values())
        if (start < end)
          pushArray(middle, title.substring(start, end + 1).trim(), td);
  }

  return {front, back, middle, whole};
}

function pushArray(w: Waka, t: string, a: HTMLTableDataCellElement) {
  if (t.length === 0)
    return;
  if (w.has(t)) {
    // @ts-ignore
    w.get(t).push(a);
  } else {
    w.set(t, [a]);
  }
}


export default async function(links: NodeListOf<HTMLAnchorElement>): Promise<void> {
  const config = getConfig();
  const maps = buildMaps(links);

  for (const id of config.itemMatch.order) {
    const group = config.itemMatch.groups[id.toString()];

    if (!group.enabled)
      continue;

    const style = config.styles.values[group.styles[0].toString()];

    for (const item of group.items)
      for (const td of matches(item, maps))
        applyStyle(style, td);
  }
}

/**
 * Matches the given text against the given node.
 */
function matches(text: string, maps: WakaWaka): Array<HTMLTableDataCellElement> {
  if (text === "")
    return [];

  const wcl = Text.hasWildcardLeft(text);
  const wcr = Text.hasWildcardRight(text);
  const trm = wcl || wcr ? Text.trimWildCard(text) : text;

  let out: Array<HTMLTableDataCellElement> = [];

  if (wcl && wcr) {
    if (maps.middle.has(trm))
      // @ts-ignore
      out = maps.middle.get(trm);
    else if (maps.front.has(trm))
      // @ts-ignore
      out = maps.front.get(trm);
    else if (maps.back.has(trm))
      // @ts-ignore
      out = maps.back.get(trm);
   } else if (wcr) {
    if (maps.front.has(trm)) {
      // @ts-ignore
      out = maps.front.get(trm);
    }
   } else if (wcl) {
    if (maps.back.has(trm))
      // @ts-ignore
      out = maps.back.get(trm);
  }
  if (out.length === 0 && maps.whole.has(trm))
    // @ts-ignore
    out = maps.whole.get(trm);

  return out;
}