import Storage from "../../../lib/store/static-store";
import { defaultShopData, newShopData, ShopData } from "./shop-data";
import { applyHighlight } from "./shop-highlighter";
import { ItemRefMap } from "../../../lib/dom/item-ref";


/**
 * Location URL Param object type value for shops.
 *
 * TODO: This is used elsewhere too, this should be relocated.
 */
const OBJECT_TYPE_KEY = "shop";

/**
 * Defines the length of time a snapshot will be considered
 * valid (in milliseconds).
 *
 * @todo Make this configurable
 */
const TIMEOUT = 20 * 60 * 1000;

export async function handler(
  nodes: ItemRefMap,
  shopId: number,
): Promise<void> {
  const key = genKey(shopId);
  const store = (await Storage.loadLocal<ShopData>(key)).orElseGet(defaultShopData);
  const now = new Date().getTime();

  // If the last snapshot is empty or too old, don't apply
  // highlighting, just store the current state.
  if (Object.keys(store.stale).length === 0 || now - store.time > TIMEOUT) {

    await Storage.saveLocal(key, newShopData(nodes, nodes, new Date().getTime()));

    return;
  }

  await Storage.saveLocal(key, applyHighlight(store, nodes));
}

/**
 * Generate a distinct key for a specific shop to avoid
 * collisions with other object types in the browser store.
 */
function genKey(id: number): string {
  return OBJECT_TYPE_KEY + id;
}
