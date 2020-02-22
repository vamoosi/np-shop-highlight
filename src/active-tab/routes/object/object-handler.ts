import { shopHandler } from "./shops/shop-handler";
import { ObjectDetails, ObjectHandler, ObjectHandlerMap } from "./types";
import { debugIn, debugOut } from "../../../lib/logging";

const OBJECT_TYPE_KEY = "type";
const OBJECT_ID_KEY = "obj_type";

const tag = (n: string) => __filename + ":" + n;

/**
 * Object type routes
 */
const objectHandlers: ObjectHandlerMap = {
  "shop": shopHandler,
};

const defaultHandler: ObjectHandler = (_) => {
};

function parseObjectUrl(): ObjectDetails {
  debugIn(tag("parseObjectUrl"));

  const url = new URLSearchParams(window.location.search);

  return debugOut(tag("parseObjectUrl"), {
    type: url.get(OBJECT_TYPE_KEY) || "",
    id: parseInt(url.get(OBJECT_ID_KEY) || "0"),
  });
}

export function objectHandler() {
  const params = parseObjectUrl();

  (objectHandlers[params.type] || defaultHandler)(params);
}
