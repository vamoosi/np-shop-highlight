import Storage from "../../../lib/store/static-store";
import { defaultShopData, newShopData, ShopData } from "./shop-data";
import { newPageData, PageData } from "./page-data";
import { ElementData, newElementData } from "./element-data";
import { applyHighlight } from "./shop-highlighter";

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
 *
 * TODO: This is used elsewhere too, this should be relocated.
 */
const OBJECT_TYPE_KEY = "shop";

/**
 * Defines the length of time a snapshot will be considered
 * valid (in milliseconds).
 *
 * @todo Make this configurable
 */
const TIMEOUT = 20 * 60 * 1000;

export async function handler(
  nodes: NodeListOf<HTMLDivElement>,
  shopId: number,
): Promise<void> {
  const key = genKey(shopId);
  const store = (await Storage.loadLocal<ShopData>(key)).orElseGet(defaultShopData);
  const page = buildPageData(linkData(nodes));
  const now = new Date().getTime();

  // If the last snapshot is empty or too old, don't apply
  // highlighting, just store the current state.
  if (store.fresh.length === 0 || now - store.time > TIMEOUT) {

    await Storage.saveLocal(key, newShopData(page.items, page.items, new Date().getTime()));

    return;
  }

  await Storage.saveLocal(key, applyHighlight(store, page));
}

function buildPageData(data: Array<ElementData>): PageData {
  const out = newPageData([], new Map());

  for (let i = 0; i < data.length; i++) {
    out.items.push(data[i].val);
    out.elems.set(data[i].val.itemInfoId, data[i]);
  }

  return out;
}

/**
 * Constructs an array of ElementData populated by the shop item's link details.
 *
 * @param nodeList A list of shop item Div elements.
 *
 * @return an array of ElementData objects that will have a length that is equal
 * to or less than the input node list.
 */
function linkData(nodeList: NodeListOf<HTMLDivElement>): Array<ElementData> {
  const out = [];

  for (const div of nodeList) {
    const img = (<HTMLDivElement> div).querySelector<HTMLDivElement>(".item-img");

    if (img === null)
      continue;

    // noinspection JSUnresolvedVariable
    const dataLink = img.getAttribute("data-link");

    // If there was no data-link element, attribute do nothing?
    if (dataLink === null)
      continue;

    const query = (<string> dataLink).split("?");

    // If there was no query on the dataLink attribute, also do nothing?
    if (query.length < 2)
      continue;

    const params = new URLSearchParams(query[1]);

    if (!params.has(STOCK_ID_KEY) || !params.has(OBJ_INFO_ID))
      continue;

    out.push(newElementData(
      div,
      parseInt(params.get(STOCK_ID_KEY) || "0"),
      parseInt(params.get(OBJ_INFO_ID) || "0"),
    ));
  }

  return out;
}

/**
 * Generate a distinct key for a specific shop to avoid
 * collisions with other object types in the browser store.
 */
function genKey(id: number): string {
  return OBJECT_TYPE_KEY + id;
}
