import { ItemDetails, newItemDetails } from "./item-details";

export interface ElementData {
  readonly tag: HTMLAnchorElement;
  readonly val: ItemDetails;
}

/**
 * Constructs a new {@link ElementData} object from the
 * given input params.
 */
export function newElementData(
  tag: HTMLAnchorElement,
  stockId: number,
  itemInfoId: number,
): ElementData {
  return { tag, val: newItemDetails(stockId, itemInfoId) };
}