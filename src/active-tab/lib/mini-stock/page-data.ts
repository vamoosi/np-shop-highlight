import { ItemDetails } from "./item-details";
import { ElementData } from "./element-data";

/**
 * Convenience container for processed page link
 * data.
 */
export interface PageData {
  readonly items: Array<ItemDetails>;
  readonly elems: Map<number, ElementData>;
}

/**
 * Creates a new {@link PageData} instance using the given
 * input params.
 */
export function newPageData(
  items: Array<ItemDetails>,
  elems: Map<number, ElementData>
): PageData {
  return { items, elems };
}
