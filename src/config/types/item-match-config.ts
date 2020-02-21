import {
  ItemHighlightGroup,
  newItemHighlightGroup,
} from "./item-highlight-group";

export interface ItemMatchConfig {
  /**
   * Determines whether or no the item matching
   * component of this extension should be enabled.
   */
  enabled: boolean;

  /**
   * Index of item highlight groups by id
   */
  groups: { [key: string]: ItemHighlightGroup };

  /**
   * Array of ItemHighlightGroup ids in the order in
   * which they should be rendered.
   */
  order: Array<number>;

  /**
   * Index of ordered item group id lists by shop id.
   */
  byShop: { [key: string]: Array<number> };
}

/**
 * Creates a defaulted instance of the ItemMatchConfig
 * object.
 */
export function defaultItemMatchConfig(): ItemMatchConfig {
  return {
    enabled: false,
    groups: {
      "1": newItemHighlightGroup(1, "Default", [], [ "Negg" ], []),
    },
    order: [],
    byShop: {},
  };
}
