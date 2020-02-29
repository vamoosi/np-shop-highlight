export interface ItemHighlightGroup {
  id: number;
  name: string;
  enabled: boolean;

  /**
   * List of strings to match against items to determine
   * what to highlight.
   */
  items: Array<string>;

  /**
   * IDs of stores that the ItemHighlightGroup should
   * apply to.
   */
  stores: Array<number>;

  /**
   * List of style ids to apply to the items matched by
   * strings in the items list.
   *
   * Styles will be applied as follows:
   *
   * * If 1 style is present, all items matched by any of
   *   the strings in the `items` array will have this style
   *   applied.
   *
   * * If 2 styles are present, the first item from the
   *   `items` list to appear on the page will the first
   *   style applied, and all items matched by subsequent
   *   `items` strings will have the second style applied.
   *
   * * If more than 2 styles are present, the first item
   *   from the items list to appear on the page will have
   *   the first highlight style applied, the second item
   *   from the items list to appear on the page will have
   *   the second highlight style applied, and so forth.
   *   Once the last style is hit all items matched by any
   *   remaining entries in the `items` list will have the
   *   last style applied.
   *
   * Example:
   *
   *   Given:
   *
   *     items: [foo, bar, fizz, buzz, this, that, theother ]<br>
   *     styles: [ A, B, C, D, E ]
   *
   *   The styles would be mapped as follows:
   *
   *     1. foo      -> A
   *     2. bar      -> B
   *     3. fizz     -> C
   *     4. buzz     -> D
   *     5. this     -> E
   *     6. that     -> E
   *     7. theother -> E
   */
  styles: Array<number>;
}

/**
 * Create a new ItemHighlightGroup instance from the given
 * input params.
 */
export function newItemHighlightGroup(
  id: number,
  name: string,
  stores: Array<number> = [],
  items: Array<string> = [],
  styles: Array<number> = [],
): ItemHighlightGroup {
  return { id, name, stores, items, styles, enabled: true };
}
