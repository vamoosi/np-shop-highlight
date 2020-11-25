import { StorableRefMap } from "../../../lib/dom/item-ref";

export interface ShopData {
  fresh: StorableRefMap;
  stale: StorableRefMap;
  time: number;
}

/**
 * Creates a defaulted instance of a ShopData object.
 *
 * @return {ShopData}
 */
export function defaultShopData() {
  return newShopData({}, {}, 0);
}

/**
 * Creates a new {@link ShopData} instance using the given input params.
 */
export function newShopData(fresh: StorableRefMap, stale: StorableRefMap, time: number): ShopData {
  return { fresh, stale, time };
}