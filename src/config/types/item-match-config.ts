import {
  ItemHighlightGroup,
  newItemHighlightGroup,
} from "./item-highlight-group";

export interface GroupMap {
  [key: string]: ItemHighlightGroup;
}

export interface ShopMap {
  [key: string]: Array<number>;
}

export interface ItemMatchConfig {
  /**
   * Index of item highlight groups by id
   */
  groups: GroupMap;

  /**
   * Array of ItemHighlightGroup ids in the order in
   * which they should be rendered.
   */
  order: Array<number>;

  /**
   * Index of ordered item group id lists by shop id.
   */
  byShop: ShopMap;
}

/**
 * Creates a defaulted instance of the ItemMatchConfig
 * object.
 */
export function defaultItemMatchConfig(): ItemMatchConfig {
  return newItemMatchConfig(
    [1],
    { "1": newItemHighlightGroup(1, "Default", [], [ "Negg" ], []) },
    {}
  );
}

export function newItemMatchConfig(
  order: Array<number>,
  groups: GroupMap,
  byShop: ShopMap
) {
  return { order, groups, byShop };
}