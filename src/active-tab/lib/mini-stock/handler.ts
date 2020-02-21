import Storage from "../../../lib/store/static-store";
import { defaultShopData, newShopData, ShopData } from "./shop-data";
import { newPageData, PageData } from "./page-data";
import { ElementData, newElementData } from "./element-data";
import { applyHighlight } from "./shop-highlighter";

/**
 * Anchor URL Param Stock ID key.
 */
const STOCK_ID_KEY = "stock_id";

/**
 * Anchor URL Param Object Info ID key.
 */
const OBJ_INFO_ID = "obj_info_id";

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
  nodes: NodeListOf<HTMLAnchorElement>,
  shopId: number,
): Promise<void> {
  const key = genKey(shopId);
  const store = (await Storage.loadLocal<ShopData>(key)).orElseGet(defaultShopData);
  const page = buildPageData(linkData(nodes));
  const now = new Date().getTime();

  // If the last snapshot is empty or too old, don't apply
  // highlighting, just store the current state.
  if (store.fresh.length === 0 || now - store.time > TIMEOUT) {

    await Storage.saveLocal(key, newShopData(page.items, page.items, new Date().getTime()));

    return;
  }

  await Storage.saveLocal(key, applyHighlight(store, page));
}

function buildPageData(data: Array<ElementData>): PageData {
  const out = newPageData([], new Map());

  for (let i = 0; i < data.length; i++) {
    out.items.push(data[i].val);
    out.elems.set(data[i].val.itemInfoId, data[i]);
  }

  return out;
}

function linkData(nodeList: NodeListOf<HTMLAnchorElement>): Array<ElementData> {
  const out = [];

  for (const anchor of nodeList) {
    // noinspection JSUnresolvedVariable
    const ref = anchor.href.split("?");

    if (ref.length < 2)
      continue;

    const params = new URLSearchParams(ref[1]);

    if (!params.has(STOCK_ID_KEY) || !params.has(OBJ_INFO_ID))
      continue;

    out.push(newElementData(
      anchor,
      parseInt(params.get(STOCK_ID_KEY) || "0"),
      parseInt(params.get(OBJ_INFO_ID) || "0"),
    ));

  }

  return out;
}

/**
 * Generate a distinct key for a specific shop to avoid
 * collisions with other object types in the browser store.
 */
function genKey(id: number): string {
  return OBJECT_TYPE_KEY + id;
}
