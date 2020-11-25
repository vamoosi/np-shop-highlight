import { getConfig } from "../../../config/Configuration";
import { ShopData } from "./shop-data";
import { ItemRef, ItemRefMap, StorableRefMap } from "../../../lib/dom/item-ref";


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
export function applyHighlight(snap: ShopData, cur: ItemRefMap): ShopData {
  const stale: StorableRefMap = {};
  const fresh: StorableRefMap = {};
  cur = JSON.parse(JSON.stringify(cur))

  // Iterate through the items that are marked as stale and remove them from the
  // list of elements we care about.
  for (const key of Object.keys(snap.stale)) {
    if (cur[key]) {
      stale[key] = cur[key].toStorable();
      delete cur[key];
    }
  }

  // Iterate through the items that were marked as "new" in the last refresh.
  // If they are still on the page, highlight them as "stale" and move them to
  // the stale list.
  for (const key of Object.keys(snap.fresh)) {
    if (snap.fresh.hasOwnProperty(key)) {

      const tmp = cur[key];

      if (tmp) {
        highlightStale(tmp)
        stale[tmp.infoId] = tmp.toStorable()
        delete cur[key]
      }
    }
  }

  // Iterate through the remaining items on the page and mark them as new
  for (const key of Object.keys(cur)) {
    if (cur.hasOwnProperty(key)) {

      highlightFresh(cur[key])
      fresh[key] = cur[key].toStorable();
    }
  }

  return {
    time: new Date().getTime(),
    fresh: fresh,
    stale: stale,
  };
}

/**
 * Applies any mutations to dom required to highlight a
 * stale shop item.
 */
function highlightStale(item: ItemRef) {
  const conf = getConfig();
  const mini = conf.miniStock;
  const sMap = conf.styles.values;

  if (!conf.miniStock.enableStale)
    return;

  item.applyStyle(sMap[mini.staleStyle.toString()]);
}

/**
 * Applies any mutations to dom required to highlight a
 * new shop item.
 */
function highlightFresh(item: ItemRef) {
  const conf = getConfig();
  const mini = conf.miniStock;
  const sMap = conf.styles.values;

  if (!conf.miniStock.enableFresh)
    return;

  item.applyStyle(sMap[mini.freshStyle.toString()]);
}
