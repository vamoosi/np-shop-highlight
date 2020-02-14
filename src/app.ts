import { HandlerMap }     from "./handler";
import { defaultHandler } from "./default-handler";
import { objectHandler }  from "./object/object-handler";

const recognizedPaths: HandlerMap = {
  "/objects.phtml": objectHandler
};

(recognizedPaths[window.location.pathname] || defaultHandler)();
