import { HandlerMap }     from "./handler";
import { defaultHandler } from "./default-handler";
import { objectHandler }  from "./object/object-handler";

const recognizedPaths: HandlerMap = {
  "/objects.phtml": objectHandler
};

console.log("LOAD");

(recognizedPaths[window.location.pathname] || defaultHandler)();
