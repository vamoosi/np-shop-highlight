"use strict";

import * as Store from "../../lib/store";
import App from "../svelte/app.svelte"
import * as Conf from "./app-config";
import { defaultAppConfig } from "../../config/types/app-config";

const confKey = "app-config";
const config  = defaultAppConfig();
let last;

Store.load(confKey)
  .then(o => {
    const tmp = o || config;
    last = JSON.stringify(tmp);
    Conf.setConfig(tmp);
  })
  .catch(console.log);

Conf.subscribe(v => {
  if (last !== JSON.stringify(v)) {
    last = JSON.stringify(v);
    Store.save(confKey, v);
  }
});

const app = new App({
  target: document.body,
  props: Conf.getConfigStore()
});