import { ObjectParams } from "../object-handler";
import { Store }        from "../../storage";
import { ShopId }       from "./shop-list";

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Constants
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const anchorQuery = "a[onclick]";
const stockIdKey  = "stock_id";
const objInfoId   = "obj_info_id";
const shopTypeKey = "shop";

/**
 * Defines the length of time a snapshot will be considered
 * valid (in milliseconds).
 */
const timeout = 20 * 60 * 1000;

const defaultPage: ShopData = {
  fresh: [],
  stale: [],
  time: 0
};

const staleColor = "#f4ff79";
const freshColor = "#58ff89";

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Types
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * Newtype for an array of item details
 */
type ItemDetailList = Array<ItemDetails>;

/**
 * Newtype for an array of element data
 */
type ElementDataList = Array<ElementData>;

/**
 * Container for parsed item link details
 */
interface ItemDetails {
  stockId: number;
  itemInfoId: number;
}

/**
 * Container for the current and previous snapshots of an
 * item shop's available merchandise.
 */
interface ShopData {
  /**
   * Most recent available item snapshot.
   */
  fresh: ItemDetailList;

  /**
   * Previous available item snapshot.
   */
  stale: ItemDetailList;

  /**
   * Timestamp for the most recent item snapshot.
   */
  time: number;
}

/**
 * Convenience/efficiency container for processed page link
 * data.
 */
interface PageData {

  /**
   * Collection of all parsed item details from the item
   * links currently in the dom.
   */
  items: ItemDetailList;

  /**
   * Map of item id number to element data for every item
   * link currently in the page.
   */
  elems: Map<number, ElementData>;
}

interface ElementData {
  tag: HTMLAnchorElement;
  val: ItemDetails;
}

class ShopHandler {
  private snapshot: ShopData;
  private current: PageData;

  constructor(snap: ShopData, cur: PageData) {
    this.snapshot = snap;
    this.current = cur;
  }

  apply(): ShopData {
    const curMap = this.current.elems;
    const dead   = this.snapshot.stale;
    const stale  = this.snapshot.fresh;

    console.log(stale);

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
    for (const key of curMap.keys()) {
      highlightFresh(curMap.get(key).tag);
    }

    return {
      time: new Date().getTime(),
      fresh: this.current.items,
      stale: stale
    }
  }
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Functions
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

function highlightStale(a: HTMLAnchorElement) {
  a.parentElement.style.backgroundColor = staleColor;
}

function highlightFresh(a: HTMLAnchorElement) {
  a.parentElement.style.backgroundColor = freshColor;
}

function genKey(id: ShopId): string {
  return shopTypeKey + id;
}

function getLinks(): NodeList {
  return document.querySelectorAll(anchorQuery);
}

function linkData(anchors: NodeList): ElementDataList {
  const out: ElementDataList = [];

  for (let i = 0; i < anchors.length; i++) {
    const tag = <HTMLAnchorElement> anchors.item(i);
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

function buildPageData(data: ElementDataList): PageData {
  const out: PageData = { items: [], elems: new Map<number, ElementData>() };

  for (let i = 0; i < data.length; i++) {
    out.items.push(data[i].val);
    out.elems.set(data[i].val.itemInfoId, data[i]);
  }
  return out;
}

export async function shopHandler(params: ObjectParams) {
  const data = linkData(getLinks());
  const key = genKey(params.objectType);

  // Unsafely assume the data is what we want for now
  const load = <ShopData> (await Store.load(key))[key] || defaultPage;
  const page = buildPageData(data);
  const now  = new Date().getTime();

  // If the last snapshot is empty or too old, don't apply
  // highlighting, just store the current state.
  if (load.fresh.length == 0 || now - load.time > timeout) {
    console.log("Storing initial state:");
    console.log(load);
    console.log(now - load.time);

    Store.save(key, {
      time: new Date().getTime(),
      fresh: page.items,
      stale: page.items
    });
    return
  }

  Store.save(key, new ShopHandler(load, page).apply());
}
