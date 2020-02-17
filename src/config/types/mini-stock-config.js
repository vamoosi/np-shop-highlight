/**
 * @typedef {object} MiniStockConfig
 *
 * @property {boolean} enabled
 *     Whether or not the MiniStock component of the
 *     extension should be enabled.
 *
 * @property {number} staleStyle
 *     The style that should be applied to new items from
 *     the previous page refresh.
 *
 * @property {number} freshStyle
 *     The style that should be applied to new items from
 *     the most recent refresh.
 *
 * @property {boolean} enableFresh
 *     Enable highlighting "fresh" items from the last
 *     refresh.
 *
 * @property {boolean} enableStale
 *     Enable highlighting "stale" items from the refresh
 *     before last.
 */


/**
 * Creates a defaulted instance of a MiniStockConfig
 * object.
 *
 * @returns {MiniStockConfig}
 */
export function defaultMiniStockConfig() {
  return {
    enabled: true,

    enableFresh: true,
    freshStyle: 1,

    enableStale: true,
    staleStyle: 2,
  };
}