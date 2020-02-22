"use strict";

import { getConfig } from "../../../../config/Configuration";
import { findAll } from "../../../../lib/dom/query";
import IM from "../../../lib/item-match";
import * as MS from "../../../lib/mini-stock/handler";
import { ObjectDetails } from "../types";

/**
 * Shop item link document query.
 *
 * Used to locate links that may be relevant as shop items.
 */
const ANCHOR_QUERY = "a[onclick]";

export function shopHandler(params: ObjectDetails): void {
  const config = getConfig();
  const nodes = findAll<HTMLAnchorElement>(ANCHOR_QUERY);

  if (config.general.features.itemMatch)
    IM(nodes).catch(console.log);

  if (config.general.features.miniStock)
    MS.handler(nodes, params.id)
      .catch(console.log);
}
