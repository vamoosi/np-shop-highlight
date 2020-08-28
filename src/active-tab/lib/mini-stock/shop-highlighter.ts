import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";
import { ShopData } from "./shop-data";
import { PageData } from "./page-data";
import { Option } from "../../../lib/option";


/**
 * Constructs a new ShopData snapshot based on the items currently on the store
 * page.
 *
 * @param snap The previous snapshot of the "new" items on the current store
 * page.
 * @param cur  The current store item list.
 *
 * @return {ShopData}
 */
export function applyHighlight(snap: ShopData, cur: PageData) {
  // Items currently displayed on the page.
  const curMap = cur.elems;

  // Items that were on the page 2 refreshes ago.
  const dead = snap.stale;

  // Items that were on the page 1 refresh ago.
  const stale = snap.fresh;

  // Remove the snapshot stale data from further processing
  for (let i = 0; i < dead.length; i++)
    curMap.delete(dead[i].itemInfoId);

  // Highlight new stale items (snapshot fresh)
  for (let i = 0; i < stale.length; i++) {
    if (curMap.has(stale[i].itemInfoId)) {
      Option.maybe(curMap.get(stale[i].itemInfoId))
        .ifSome(i => highlightStale(i.tag));
      curMap.delete(stale[i].itemInfoId);
    }
  }

  // Highlight fresh items
  for (const key of curMap.keys())
    Option.maybe(curMap.get(key)).ifSome(i => highlightFresh(i.tag));

  return {
    time: new Date().getTime(),
    fresh: cur.items,
    stale: stale,
  };
}

/**
 * Applies any mutations to dom required to highlight a
 * stale shop item.
 */
function highlightStale(item: HTMLDivElement) {
  const conf = getConfig();
  const mini = conf.miniStock;
  const sMap = conf.styles.values;

  if (!conf.miniStock.enableStale)
    return;

  applyStyle(sMap[mini.staleStyle.toString()], item);
}

/**
 * Applies any mutations to dom required to highlight a
 * new shop item.
 */
function highlightFresh(item: HTMLDivElement) {
  const conf = getConfig();
  const mini = conf.miniStock;
  const sMap = conf.styles.values;

  if (!conf.miniStock.enableFresh)
    return;

  applyStyle(sMap[mini.freshStyle.toString()], item.parentElement);
}
