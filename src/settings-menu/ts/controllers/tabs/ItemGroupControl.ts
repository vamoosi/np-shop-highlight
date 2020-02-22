import {
  GroupMap,
  ItemMatchConfig, newItemMatchConfig,
} from "../../../../config/types/item-match-config";
import { arrayOmit } from "../../../../lib/util";
import {
  ItemHighlightGroup,
  newItemHighlightGroup,
} from "../../../../config/types/item-highlight-group";
import { AppConfig } from "../../../../config/types/app-config";

export function removeGroup(conf: ItemMatchConfig, id: number): ItemMatchConfig {
  return {
    enabled: conf.enabled,
    byShop: conf.byShop,
    groups: omitGroup(conf.groups, id),
    order: arrayOmit(conf.order, id),
  }
}

export function appendGroup(app: AppConfig): ItemMatchConfig {
  const conf = app.itemMatch;
  const group = newItemHighlightGroup(
    nextId(conf.order),
    "New Group",
    [],
    [],
    [app.styles.order[0]],
  );
  return newItemMatchConfig(
    [...conf.order, group.id],
    addGroup(conf.groups, group),
    conf.byShop,
    conf.enabled,
  );
}

export function shiftGroup(conf: ItemMatchConfig, id: number, up: boolean): ItemMatchConfig {
  if (up && conf.order[0] === id)
    return conf;
  if (!up && conf.order[conf.order.length - 1] === id)
    return conf;

  for (let i = 0; i < conf.order.length; i++) {
    if (conf.order[i] === id) {
      const here = conf.order[i];
      const swap = up ? i - 1 : i + 1;
      conf.order[i] = conf.order[swap];
      conf.order[swap] = here;
      break;
    }
  }

  return newItemMatchConfig(conf.order, conf.groups, conf.byShop, conf.enabled);
}

function nextId(a: Array<number>): number {
  let out = 0;
  for (const i of a)
    if (i > out)
      out = i;
  return ++out;
}

function omitGroup(g: GroupMap, id: number): GroupMap {
  const out: GroupMap = {};
  const sid = id.toString();
  for (const key in g)
    if (g.hasOwnProperty(key) && key !== sid)
      out[key] = g[key];
  return out;
}

function addGroup(conf: GroupMap, group: ItemHighlightGroup): GroupMap {
  const out: GroupMap = {};
  for (const k in conf)
    if (conf.hasOwnProperty(k))
      out[k] = conf[k];
  out[group.id.toString()] = group;
  return out;
}