import * as Store from "../../lib/store";
import { writable } from "svelte/store";
import { defaultAppConfig } from "../../config/types/app-config";
import App from "../svelte/app.svelte"

const confKey = "app-config";
const config  = defaultAppConfig();
const store   = writable(config);

Store.load(confKey)
  .then(o => store.set(o || config))
  .catch(console.log);

store.subscribe(v => {
  Store.save(confKey, v);
});

const app = new App({
  target: document.body,
  props: store
});