import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";
import { ShopData } from "./shop-data";
import { PageData } from "./page-data";
import { Option } from "../../../lib/option";


/**
 * @return {ShopData}
 */
export  function applyHighlight(snap: ShopData, cur: PageData) {
  const curMap = cur.elems;
  const dead   = snap.stale;
  const stale  = snap.fresh;

  // Remove the snapshot stale data from further processing
  for (let i = 0; i < dead.length; i++)
    curMap.delete(dead[i].itemInfoId);

  // Highlight new stale items (snapshot fresh)
  for (let i = 0; i < stale.length; i++) {
    if (curMap.has(stale[i].itemInfoId)) {
      Option.maybe(curMap.get(stale[i].itemInfoId))
        .with(i => highlightStale(i.tag));
      curMap.delete(stale[i].itemInfoId);
    }
  }

  // Highlight fresh items
  for (const key of curMap.keys())
    Option.maybe(curMap.get(key)).with(i => highlightFresh(i.tag));

  return {
    time: new Date().getTime(),
    fresh: cur.items,
    stale: stale
  }
}

/**
 * Applies any mutations to dom required to highlight a
 * stale shop item.
 */
function highlightStale(a: HTMLAnchorElement) {
  const conf = getConfig();
  const mini = conf.miniStock;
  const sMap = conf.styles.values;

  if (!conf.miniStock.enableStale)
    return;

  applyStyle(sMap[mini.staleStyle.toString()], a.parentElement);
}

/**
 * Applies any mutations to dom required to highlight a
 * new shop item.
 */
function highlightFresh(a: HTMLAnchorElement) {
  const conf = getConfig();
  const mini = conf.miniStock;
  const sMap = conf.styles.values;

  if (!conf.miniStock.enableFresh)
    return;

  applyStyle(sMap[mini.freshStyle.toString()], a.parentElement);
}
