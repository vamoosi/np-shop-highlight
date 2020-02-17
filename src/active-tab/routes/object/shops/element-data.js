/**
 * @typedef {object} ElementData
 * @property {HTMLAnchorElement} tag
 * @property {ItemDetails} val
 */

import { newItemDetails } from "./item-details";

/**
 * Constructs a new {@link ElementData} object from the
 * given input params.
 *
 * @param {HTMLAnchorElement} tag
 * @param {number} stockId
 * @param {number} itemInfoId
 *
 * @return {ElementData}
 */
export function newElementData(tag, stockId, itemInfoId) {
  return { tag, val: newItemDetails(stockId, itemInfoId) };
}