import * as Store from "../../../../lib/store";
import { ShopHighlighter } from "./shop-highlighter";
import { getConfig } from "../../../../config/Configuration";

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Constants
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Shop item link document query.
 *
 * Used to locate links that may be relevant as shop items.
 */
const anchorQuery = "a[onclick]";

/**
 * Anchor URL Param Stock ID key.
 */
const stockIdKey  = "stock_id";

/**
 * Anchor URL Param Object Info ID key.
 */
const objInfoId   = "obj_info_id";

/**
 * Location URL Param object type value for shops.
 */
const shopTypeKey = "shop";

/**
 * Defines the length of time a snapshot will be considered
 * valid (in milliseconds).
 */
const timeout = 20 * 60 * 1000;

/**
 * Empty shop data struct for use as a default when actual
 * shop data cannot be constructed or is not available.
 *
 * @type {ShopData}
 */
const defaultPage = {
  fresh: [],
  stale: [],
  time: 0
};

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Functions
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


/**
 * Generate a distinct key for a specific shop to avoid
 * collisions with other object types in the browser store.
 *
 * @param {number} id shop id
 *
 * @return {string}
 */
function genKey(id) {
  return shopTypeKey + id;
}

/**
 * Retrieve a list of relevant nodes for processing the shop
 * items.
 *
 * @return {NodeList}
 */
function getLinks() {
  return document.querySelectorAll(anchorQuery);
}

/**
 * Process the given dom nodes to parse out required data
 * for keeping track of the shop state.
 *
 * @param {NodeList} anchors shop item links
 *
 * @return {Array<ElementData>}
 */
function linkData(anchors) {
  const out = [];

  for (let i = 0; i < anchors.length; i++) {
    const tag = anchors.item(i);
    const ref = tag.href.split("?");

    if (ref.length < 2)
      continue;

    const params = new URLSearchParams(ref[1]);

    if (!params.has(stockIdKey) || !params.has(objInfoId))
      continue;

    out.push({
      tag,
      val: {
        stockId: parseInt(params.get(stockIdKey)),
        itemInfoId: parseInt(params.get(objInfoId)),
      }
    });
  }

  return out;
}

/**
 * @param {Array<ElementData>} data
 * @return {PageData}
 */
function buildPageData(data) {
  const out = { items: [], elems: new Map() };

  for (let i = 0; i < data.length; i++) {
    out.items.push(data[i].val);
    out.elems.set(data[i].val.itemInfoId, data[i]);
  }

  return out;
}

/**
 * @param {ObjectParams} params
 *
 * @return void
 */
export async function shopHandler(params) {
  if (!getConfig().miniStock.enabled)
    return;

  const data = linkData(getLinks());
  const key = genKey(params.objectType);

  // Unsafely assume the data is what we want for now
  const load = await Store.load(key) || defaultPage;
  const page = buildPageData(data);
  const now  = new Date().getTime();

  // If the last snapshot is empty or too old, don't apply
  // highlighting, just store the current state.
  if (load.fresh.length === 0 || now - load.time > timeout) {

    await Store.save(key, {
      time: new Date().getTime(),
      fresh: page.items,
      stale: page.items
    });
    return
  }

  await Store.save(key, new ShopHighlighter(load, page).apply());
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// TypeDefs
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Container for parsed item link details.
 *
 * @typedef {object} ItemDetails
 *
 * @property {number} stockId
 * @property {number} itemInfoId
 */

/**
 * @typedef {object} ShopData
 *     Container for the current and previous snapshots of
 *     an item shop's available merchandise.
 * @property {[ItemDetails]} fresh
 * @property {[ItemDetails]} stale
 * @property {number} time
 */

/**
 * Convenience/efficiency container for processed page link
 * data.
 *
 * @typedef {object} PageData
 *
 * @property {Array<ItemDetails>} items
 *     Collection of all parsed item details from the item
 *     links currently in the dom.
 *
 * @property {Map<number, ElementData>} elems
 *     Map of item id number to element data for every item
 *     link currently in the page.
 */

/**
 * @typedef {object} ElementData
 * @property {HTMLAnchorElement} tag
 * @property {ItemDetails} val
 */
