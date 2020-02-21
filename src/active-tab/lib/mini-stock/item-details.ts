export interface ItemDetails {
  readonly stockId: number;
  readonly itemInfoId: number;
}

/**
 * Constructs a new {@link ItemDetails} instance from the
 * given input params.
 */
export function newItemDetails(
  stockId: number,
  itemInfoId: number,
): ItemDetails {
  return { stockId, itemInfoId };
}