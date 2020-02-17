/**
 * @typedef {function():void} Handler
 *     Handler function
 */

import { defaultHandler } from "./default-handler";
import { objectHandler }  from "./routes/object/object-handler";
import * as Store from "../lib/store"
import { APP_CONFIG_KEY } from "../config/Constants";
import { setConfig } from "../config/Configuration";

/**
 * Active Route Registry
 *
 * @type {{[string]: objectHandler}}
 */
const recognizedPaths = {
  "/objects.phtml": objectHandler,
};

// Load Configuration then start the handler
Store.load(APP_CONFIG_KEY)
  .then(setConfig)
  .then(() => {
    // Call the route handler
    (recognizedPaths[window.location.pathname] || defaultHandler)();
  });

