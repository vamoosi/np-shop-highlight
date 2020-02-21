import Storage from "../../lib/store/static-store";

import App from "../svelte/app.svelte"
import { AppConfig, defaultAppConfig } from "../../config/types/app-config";
import { APP_CONFIG_KEY } from "../../config/Constants";
import { initConfigState } from "../../lib/store/svelte-store";

Storage.loadLocal<AppConfig>(APP_CONFIG_KEY)
  .then(o => o.orElseGet(defaultAppConfig))
  .then(initConfigState)
  .then(_ => { new App({ target: document.body }) })
  .catch(console.log);