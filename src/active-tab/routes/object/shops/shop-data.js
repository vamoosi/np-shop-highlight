/**
 * @typedef {object} ShopData
 *     Container for the current and previous snapshots of
 *     an item shop's available merchandise.
 * @property {[ItemDetails]} fresh
 * @property {[ItemDetails]} stale
 * @property {number} time
 */


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
 *
 * @param {ItemDetails[]} fresh
 * @param {ItemDetails[]} stale
 * @param {number} time
 *
 * @return {ShopData}
 */
export function newShopData(fresh, stale, time) {
  return { fresh, stale, time };
}