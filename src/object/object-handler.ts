import {shopHandler} from "./shops/shop-handler";
import {ShopId} from "./shops/shop-list";

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Constants
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

const objectHandlers: ObjectHandlerMap = {
  "shop": shopHandler
};

const typeString = "type";
const objectString = "obj_type";

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Types
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

export interface ObjectHandlerMap {
  [ ket: string ]: ObjectHandler
}

export interface ObjectParams {
  type: string
  objectType: ShopId
}

export interface ObjectHandler {
  (params: ObjectParams): void;
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Functions
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


function defaultHandler() {
  console.log("DEFAULT OBJECT")
  // Do nothing if we don't know the object type.
}

function parseObjectUrl(): ObjectParams {
  const url = new URLSearchParams(window.location.search);
  return {
    type: url.has(typeString) ? url.get(typeString) : "",
    objectType: url.has(objectString) ? parseInt(url.get(objectString)) : 0
  }
}

export function objectHandler() {
  console.log("OBJECT HANDLER");
  const params = parseObjectUrl();

  (objectHandlers[params.type] || defaultHandler)(params);
}