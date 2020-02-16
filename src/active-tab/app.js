/**
 * @typedef {function():void} Handler
 *     Handler function
 */

import { defaultHandler } from "./default-handler";
import { objectHandler }  from "./routes/object/object-handler";

/**
 * @type {Object.<string, Handler>}
 */
const recognizedPaths = {
  "/objects.phtml": objectHandler,
};

(recognizedPaths[window.location.pathname] || defaultHandler)();
