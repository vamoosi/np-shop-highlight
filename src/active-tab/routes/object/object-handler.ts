import {shopHandler} from "./shops/shop-handler";
import { ObjectDetails, ObjectHandler, ObjectHandlerMap } from "./types";

const typeString = "type";
const objectString = "obj_type";

/**
 * Object type routes
 */
const objectHandlers: ObjectHandlerMap = {
  "shop": shopHandler,
};

const defaultHandler: ObjectHandler = (_) => {};

function parseObjectUrl(): ObjectDetails {
  const url = new URLSearchParams(window.location.search);
  return {
    type: url.get(objectString) || "",
    id: parseInt(url.get(typeString) || "0")
  }
}

export function objectHandler() {
  const params = parseObjectUrl();

  (objectHandlers[params.type] || defaultHandler)(params);
}
