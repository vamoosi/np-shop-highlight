/**
 * @typedef {object} ItemMatchConfig
 *
 * @property {boolean} enabled
 *     Determines whether or no the item matching
 *     component of this extension should be enabled.
 *
 * @property {Object.<string, ItemHighlightGroup>} groups
 *     Index of item highlight groups by id
 *
 * @property {number[]} order
 *     Array of ItemHighlightGroup ids in the order in
 *     which they should be rendered.
 *
 * @property {Object.<string, number[]>} byShop
 *     Index of ordered item group id lists by shop id.
 */

import { arrayCopy, arrayOmit } from "../../lib/util";
import { copyItemHighlightGroup } from "./item-highlight-group";

/**
 * Creates a defaulted instance of the ItemMatchConfig
 * object.
 *
 * @returns {ItemMatchConfig}
 */
export function defaultItemMatchConfig() {
  return {
    enabled: false,
    groups: {
      "1": {
        id: 1,
        name: "Default",
        items: ["Negg"],
        stores: [],
        styles: [1]
      }
    },
    order: [],
    byShop: {}
  };
}

/**
 * @param {ItemMatchConfig} conf
 *
 * @return {ItemMatchConfig}
 */
export function copyConfig(conf) {
  return {
    enabled: conf.enabled,
    groups: copyGroups(conf.groups),
    order: arrayCopy(conf.order),
    byShop: copyByShop(conf.byShop),
  };
}

/**
 * @param {Object.<string, number[]>} bs
 *
 * @return {Object.<string, number[]>}
 */
function copyByShop(bs) {
  const out = {};

  for (const key in bs)
    if (bs.hasOwnProperty(key))
      out[key] = arrayCopy(bs[key]);

  return out;
}

/**
 * @param {Object.<string, ItemHighlightGroup>} groups
 *
 * @return {Object.<string, ItemHighlightGroup>}
 */
function copyGroups(groups) {
  const out = {};

  for (const key in groups)
    if (groups.hasOwnProperty(key))
      out[key] = copyItemHighlightGroup(groups[key]);

  return out;
}
