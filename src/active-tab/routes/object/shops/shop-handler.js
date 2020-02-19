"use strict";

import * as Store from "../../../../lib/store";
import { ShopHighlighter } from "./shop-highlighter";
import { getConfig } from "../../../../config/Configuration";
import { findAll, findAndTransform } from "../../../../lib/dom/query";
import { defaultShopData, newShopData } from "./shop-data";
import { newElementData } from "./element-data";
import { newPageData } from "./page-data";
import * as IM from "../../../lib/item-match/handler"

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
const ANCHOR_QUERY = "a[onclick]";

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
 */
const OBJECT_TYPE_KEY = "shop";

/**
 * Defines the length of time a snapshot will be considered
 * valid (in milliseconds).
 *
 * @todo Make this configurable
 */
const TIMEOUT = 20 * 60 * 1000;

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
  return OBJECT_TYPE_KEY + id;
}

/**
 * Process the given dom node to parse out required data
 * for keeping track of the shop state.
 *
 * @param {HTMLAnchorElement} anchor shop item links
 *
 * @return {ElementData}
 */
function linkData(anchor) {

  // noinspection JSUnresolvedVariable
  const ref = anchor.href.split("?");

  if (ref.length < 2)
    return undefined;

  const params = new URLSearchParams(ref[1]);

  if (!params.has(STOCK_ID_KEY) || !params.has(OBJ_INFO_ID))
    return undefined;

  return newElementData(
    anchor,
    parseInt(params.get(STOCK_ID_KEY)),
    parseInt(params.get(OBJ_INFO_ID)),
  );
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
 * @param {ObjectParams} params
 *
 * @return void
 */
export async function shopHandler(params) {
  const config = getConfig();

  if (config.itemMatch.enabled)
    IM.handler(findAll(ANCHOR_QUERY));

  if (!config.miniStock.enabled)
    return;

  const data = findAndTransform(ANCHOR_QUERY, linkData);
  const key = genKey(params.objectType);
  const load = await Store.load(key) || defaultShopData();
  const page = buildPageData(data);
  const now = new Date().getTime();

  // If the last snapshot is empty or too old, don't apply
  // highlighting, just store the current state.
  if (load.fresh.length === 0 || now - load.time > TIMEOUT) {

    await Store.save(key, newShopData(page.items, page.items, new Date().getTime()));

    return;
  }

  await Store.save(key, new ShopHighlighter(load, page).apply());
}
