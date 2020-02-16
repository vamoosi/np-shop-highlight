import {shopHandler} from "./shops/shop-handler";

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Constants
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * @type {ObjectHandlerMap}
 */
const objectHandlers = {
  "shop": shopHandler,
};

const typeString = "type";
const objectString = "obj_type";


// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Functions
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =


function defaultHandler() {
  // Do nothing if we don't know the object type.
}

/**
 * @returns {ObjectParams}
 */
function parseObjectUrl() {
  const url = new URLSearchParams(window.location.search);
  return {
    type: url.has(typeString) ? url.get(typeString) : "",
    objectType: url.has(objectString) ? parseInt(url.get(objectString)) : 0
  }
}

export function objectHandler() {
  const params = parseObjectUrl();

  (objectHandlers[params.type] || defaultHandler)(params);
}

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
//
// Types
//
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/**
 * @typedef {{string, ObjectHandler}} ObjectHandlerMap
 */
/**
 * @typedef {object} ObjectParams
 * @property {string} type
 * @property {number} objectType
 */
/**
 * @typedef {function(ObjectParams):void} ObjectHandler
 */
