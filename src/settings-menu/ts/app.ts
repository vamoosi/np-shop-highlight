import Storage from "../../lib/store/static-store";

// @ts-ignore
import App from "../svelte/App.svelte";
import { AppConfig, defaultAppConfig } from "../../config/types/app-config";
import { APP_CONFIG_KEY } from "../../config/Constants";
import { initConfigState } from "../../lib/store/svelte/SvelteStore";

function run() {
  new App({ target: document.body });
}

Storage.loadLocal<AppConfig>(APP_CONFIG_KEY)
  .then(o => o.orElseGet(defaultAppConfig))
  .then(initConfigState)
  .then(run)
  .catch(console.log);