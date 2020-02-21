import Storage from "../../lib/store/static-store";

import App from "../svelte/app.svelte";
import { AppConfig, defaultAppConfig } from "../../config/types/app-config";
import { APP_CONFIG_KEY } from "../../config/Constants";
import { initConfigState } from "../../lib/store/svelte/SvelteStoreImpl";
import { SvelteStore } from "../../lib/store/svelte";
import { debug, LogLevel, setLogLevel } from "../../lib/logging";

const tag = (n: string) => __filename + ":" + n;
const tagIn = (n: string) => tag(n) + ".start";
const tagOut = (n: string) => tag(n) + ".stop";

function run() {
  debug(tagIn(run.name), null);

  // const debugEnabled = <boolean> SvelteStore.get('general', 'debug')
  //   .orElse(false);

  // if (debugEnabled)
  //   setLogLevel(LogLevel.DEBUG);

  SvelteStore.readableStore()
    .subscribe(c => {
      if (c.general.debug)
        setLogLevel(LogLevel.DEBUG);
      else
        setLogLevel(LogLevel.WARN);
    });

  new App({ target: document.body });

  debug(tagOut(run.name), null);
}

Storage.loadLocal<AppConfig>(APP_CONFIG_KEY)
  .then(o => o.orElseGet(defaultAppConfig))
  .then(initConfigState)
  .then(run)
  .catch(console.log);