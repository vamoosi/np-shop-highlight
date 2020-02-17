/**
 * Container for parsed item link details.
 *
 * @typedef {object} ItemDetails
 *
 * @property {number} stockId
 * @property {number} itemInfoId
 */

/**
 * Constructs a new {@link ItemDetails} instance from the
 * given input params.
 *
 * @param {number} stockId
 * @param {number} itemInfoId
 *
 * @return {ItemDetails}
 */
export function newItemDetails(stockId, itemInfoId) {
  return { stockId, itemInfoId };
}