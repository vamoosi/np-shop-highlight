"use strict";

/**
 * @property {ShopData} snapshot
 * @property {PageData} current
 */
import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";

export class ShopHighlighter {

  /**
   * @param {ShopData} snap
   * @param {PageData} cur
   */
  constructor(snap, cur) {
    this.snapshot = snap;
    this.current = cur;
  }

  /**
   * @return {ShopData}
   */
  apply() {
    const curMap = this.current.elems;
    const dead   = this.snapshot.stale;
    const stale  = this.snapshot.fresh;

    // Remove the snapshot stale data from further processing
    for (let i = 0; i < dead.length; i++)
      curMap.delete(dead[i].itemInfoId);

    // Highlight new stale items (snapshot fresh)
    for (let i = 0; i < stale.length; i++) {
      if (curMap.has(stale[i].itemInfoId)) {
        highlightStale(curMap.get(stale[i].itemInfoId).tag);
        curMap.delete(stale[i].itemInfoId);
      }
    }

    // Highlight fresh items
    for (const key of curMap.keys())
      highlightFresh(curMap.get(key).tag);

    return {
      time: new Date().getTime(),
      fresh: this.current.items,
      stale: stale
    }
  }
}

/**
 * Applies any mutations to dom required to highlight a
 * stale shop item.
 *
 * @param {HTMLAnchorElement} a
 *     anchor tag representing the shop item in the page
 */
function highlightStale(a) {
  const conf = getConfig();
  const mini = conf.miniStock;
  const sMap = conf.styles.values;

  if (!conf.miniStock.enableStale)
    return;

  applyStyle(sMap[mini.staleStyle.toString()], a.parentElement);
}

/**
 * Applies any mutations to dom required to highlight a
 * new shop item.
 *
 * @param {HTMLAnchorElement} a
 *     anchor tag representing the shop item in the page
 */
function highlightFresh(a) {
  const conf = getConfig();
  const mini = conf.miniStock;
  const sMap = conf.styles.values;

  if (!conf.miniStock.enableFresh)
    return;

  applyStyle(sMap[mini.freshStyle.toString()], a.parentElement);
}
