"use strict";

/**
 * Convenience/efficiency container for processed page link
 * data.
 *
 * @typedef {object} PageData
 *
 * @property {Array<ItemDetails>} items
 *     Collection of all parsed item details from the item
 *     links currently in the dom.
 *
 * @property {Map<number, ElementData>} elems
 *     Map of item id number to element data for every item
 *     link currently in the page.
 */

/**
 * Creates a new {@link PageData} instance using the given
 * input params.
 *
 * @param {Array<ItemDetails>} items
 * @param {Map<number, ElementData>} elems
 *
 * @return {PageData}
 */
export function newPageData(items, elems) {
  return { items, elems };
}
