/**
 * @typedef {object} ItemMatchConfig
 *
 * @property {boolean} enabled
 *     Determines whether or no the item matching
 *     component of this extension should be enabled.
 *
 * @property {[ItemHighlightGroup]} groups
 *     Cascade of item highlight groups to apply.
 */

/**
 * Creates a defaulted instance of the ItemMatchConfig
 * object.
 *
 * @returns {ItemMatchConfig}
 */
export function defaultItemMatchConfig() {
  return {
    enabled: false,
    groups: [],
  };
}