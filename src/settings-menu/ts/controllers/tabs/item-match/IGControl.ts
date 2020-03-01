import { arrayOmit } from "../../../../../lib/util";
import {
  ItemGroupId,
  newItemHighlightGroup,
} from "../../../../../config/types/item-highlight-group";
import Store from '../../../../../lib/store/svelte/SvelteStore'

export interface ItemGroupController {
  deleteGroup(id: ItemGroupId): ItemGroupId;
  newGroup(): ItemGroupId;
  shiftGroup(id: ItemGroupId, up: boolean): void;
}

function nextId(a: Array<number>): ItemGroupId {
  let out = 0;
  for (const i of a)
    if (i > out)
      out = i;
  return ++out;
}

const out: ItemGroupController = {
  deleteGroup(id: ItemGroupId): ItemGroupId {
    const conf = Store.get();
    const im   = conf.itemMatch;

    let out = id;

    if (im.order.length === 1) {
      alert("There must be at least one item group.");
      return out;
    }

    if (im.order[0] === id)
      out = im.order[1];
    else
      out = im.order[im.order.indexOf(id) - 1];

    delete im.groups[id.toString()];
    im.order = arrayOmit(im.order, id);

    Store.put(conf);

    return out;
  },
  newGroup(): ItemGroupId {
    const conf  = Store.get();
    const im    = conf.itemMatch;
    const id    = nextId(im.order);

    im.groups[id.toString()] = newItemHighlightGroup(
      id,
      "New Group",
      [],
      [],
      [conf.styles.order[0]],
    );

    im.order.push(id);
    Store.put(conf);

    return id;
  },
  shiftGroup(id: ItemGroupId, up: boolean): void {
    const conf = Store.get();
    const im   = conf.itemMatch;

    if (up && im.order[0] === id)
      return;
    if (!up && im.order[im.order.length - 1] === id)
      return;

    for (let i = 0; i < im.order.length; i++) {
      if (im.order[i] === id) {
        const here = im.order[i];
        const swap = up ? i - 1 : i + 1;
        im.order[i] = im.order[swap];
        im.order[swap] = here;
        break;
      }
    }

    Store.put(conf);
  },
};

export default out;
