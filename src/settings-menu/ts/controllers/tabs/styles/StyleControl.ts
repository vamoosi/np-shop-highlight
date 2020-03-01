import { AppConfig } from "../../../../../config/types/app-config";
import {
  newHighlightStyle,
  StyleId,
} from "../../../../../config/types/highlight-style";
import Store from "../../../../../lib/store/svelte/SvelteStore"
import { HighlightConfig } from "../../../../../config/types/highlight-config";
import { arrayOmit } from "../../../../../lib/util";

export interface StyleControlController{
  deleteStyle(id: StyleId): StyleId;
  addStyle(): StyleId;
}

const out: StyleControlController = {
  deleteStyle(id: StyleId): StyleId {
    const conf = Store.get();

    let out = id;

    if (inUse(conf, id)) {
      alert('Cannot delete this style, it is currently in use.');
      return out;
    }

    // Store current selection since we are gonna change it.

    if (conf.styles.order[0] === id)
      out = conf.styles.order[1];
    else
      out = conf.styles.order[conf.styles.order.indexOf(id) - 1];


    conf.styles.order  = arrayOmit(conf.styles.order, id);
    delete conf.styles.values[id.toString()];

    Store.put(conf);

    return out;
  },

  addStyle(): StyleId {
    const conf  = Store.get();
    const style = conf.styles;
    const out   = nextHighlightId(conf.styles);

    style.order.push(out);
    style.values[out.toString()] = newHighlightStyle(out, 'New Style');

    Store.put(conf);
    return out;
  }
};

export default out;

function inUse(c: AppConfig, id: StyleId): boolean {
  if (id === c.miniStock.freshStyle || id === c.miniStock.staleStyle)
    return true;

  for (const k in c.itemMatch.groups) {
    if (!c.itemMatch.groups.hasOwnProperty(k))
      continue;

    for (const s of c.itemMatch.groups[k].styles)
      if (id === s)
        return true;
  }
  return false;
}

export function nextHighlightId(conf: HighlightConfig): number {
  let out = 0;
  for (const i of conf.order)
    if (i > out)
      out = i;
  return out + 1;
}
