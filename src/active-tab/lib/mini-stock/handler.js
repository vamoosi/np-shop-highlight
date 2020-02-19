import * as Store from "../../../lib/store";
import { defaultShopData, newShopData } from "./shop-data";
import { getConfig } from "../../../config/Configuration";
import { newPageData } from "./page-data";
import { newElementData } from "./element-data";
import { ShopHighlighter } from "./shop-highlighter";

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

/**
 * @param {NodeList} nodes
 * @param {number} shopId
 *
 * @return {Promise<void>}
 */
export async function handler(nodes, shopId) {
  const config = getConfig();
  const store  = await Store.load(genKey(shopId)) || defaultShopData();
  const page   = buildPageData(linkData(nodes));
  const now    = new Date().getTime();

  // If the last snapshot is empty or too old, don't apply
  // highlighting, just store the current state.
  if (load.fresh.length === 0 || now - load.time > TIMEOUT) {

    await Store.save(key, newShopData(page.items, page.items, new Date().getTime()));

    return;
  }

  await Store.save(key, new ShopHighlighter(load, page).apply());
}

/**
 * @param {Array<ElementData>} data
 * @return {PageData}
 */
function buildPageData(data) {
  const out = newPageData([], new Map());

  for (let i = 0; i < data.length; i++) {
    out.items.push(data[i].val);
    out.elems.set(data[i].val.itemInfoId, data[i]);
  }

  return out;
}

/**
 * @param {NodeList} nodeList shop item links
 *
 * @return {ElementData[]}
 */
function linkData(nodeList) {
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
      parseInt(params.get(STOCK_ID_KEY)),
      parseInt(params.get(OBJ_INFO_ID)),
    ));

  }

  return out;
}

/**
 * Generate a distinct key for a specific shop to avoid
 * collisions with other object types in the browser store.
 *
 * @param {number} id shop id
 *
 * @return {string}
 */
function genKey(id) {
  return OBJECT_TYPE_KEY + id;
}


