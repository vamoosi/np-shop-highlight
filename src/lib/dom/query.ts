/**
 * Locates all html elements matching the given input query.
 */

import { ItemRefMap, toRef } from "./item-ref";

export function findAll(query: Array<string>): ItemRefMap {
  let out: ItemRefMap = {};

  for (let i = 0; i < query.length; i++) {
    const results = document.querySelectorAll<HTMLElement>(query[i]);

    for (let j = 0; j < results.length; j++) {
      const tmp = toRef(results[j]);
      out[tmp.infoId] = tmp;
    }
  }

  return out;
}
