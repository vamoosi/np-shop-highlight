import { ItemDetails } from "./item-details";

export interface ShopData {
  fresh: Array<ItemDetails>;
  stale: Array<ItemDetails>;
  time: number;
}

/**
 * Creates a defaulted instance of a ShopData object.
 *
 * @return {ShopData}
 */
export function defaultShopData() {
  return newShopData([], [], 0);
}

/**
 * Creates a new {@link ShopData} instance using the given
 * input params.
 */
export function newShopData(
  fresh: Array<ItemDetails>,
  stale: Array<ItemDetails>,
  time: number,
): ShopData {
  return { fresh, stale, time };
}