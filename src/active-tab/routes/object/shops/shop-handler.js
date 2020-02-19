"use strict";

import { getConfig } from "../../../../config/Configuration";
import { findAll } from "../../../../lib/dom/query";
import * as IM from "../../../lib/item-match/handler"
import * as MS from "../../../lib/mini-stock/handler"

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


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Functions
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * @param {ObjectParams} params
 *
 * @return void
 */
export function shopHandler(params) {
  const config = getConfig();
  const nodes  = findAll(ANCHOR_QUERY);

  if (config.itemMatch.enabled)
    IM.handler(nodes)
      .catch(console.log);

  if (config.miniStock.enabled)
    MS.handler(nodes, params.objectType)
      .catch(console.log);
}
