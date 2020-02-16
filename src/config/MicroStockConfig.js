/**
 * @typedef {object} MicroStockConfig
 *
 * @property {boolean} enabled
 *     Whether or not the MiniStock component of the
 *     extension should be enabled.
 *
 * @property {HighlightStyle} staleStyle
 *     The style that should be applied to new items from
 *     the previous page refresh.
 *
 * @property {HighlightStyle} freshStyle
 *     The style that should be applied to new items from
 *     the most recent refresh.
 */


/**
 * Creates a defaulted instance of a MicroStockConfig
 * object.
 *
 * @returns {MicroStockConfig}
 */
export function defaultMicroStockConfig() {
  return {
    enabled: true,
    freshStyle: { bgColor: "#58ff89" },
    staleStyle: { bgColor: "#f4ff79" },
  };
}