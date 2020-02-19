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
  .then(_ => {
    Conf.subscribe(v => {
      const newVal = JSON.stringify(v);
      if (last !== newVal) {
        last = newVal;
        Store.save(confKey, v);
      }
    });
  })
  .then(_ => {
    new App({
      target: document.body,
      props: Conf.getConfigStore()
    });
  })
  .catch(console.log);