"use strict";

import { getConfig } from "../../../../config/Configuration";
import { findAll } from "../../../../lib/dom/query";
import ItemMatch from "../../../lib/item-match";
import * as MiniStock from "../../../lib/mini-stock/handler";
import { ObjectDetails } from "../types";

/**
 * Shop item link document query.
 *
 * Used to locate shop item div elements.
 */
const ITEM_QUERY = "div.shop-item";

export async function shopHandler(params: ObjectDetails): Promise<void> {
  const config = getConfig();
  const nodes = findAll<HTMLDivElement>(ITEM_QUERY);

  if (config.general.features.miniStock)
    await MiniStock.handler(nodes, params.id).catch(console.log);

  if (config.general.features.itemMatch)
    ItemMatch(nodes).catch(console.log);
}
