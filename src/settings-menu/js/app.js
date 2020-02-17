import * as Store from "../../lib/store";
import { writable } from "svelte/store";
import { defaultAppConfig } from "../../config/types/app-config";
import App from "../svelte/app.svelte"

const confKey = "app-config";
const config  = defaultAppConfig();
const store   = writable(config);
let last;

Store.load(confKey)
  .then(o => {
    const tmp = o || config;
    last = JSON.stringify(tmp)
    store.set(tmp);
  })
  .catch(console.log);

store.subscribe(v => {
  if (last !== JSON.stringify(v)) {
    last = JSON.stringify(v);
    Store.save(confKey, v);
  }
});

const app = new App({
  target: document.body,
  props: store
});