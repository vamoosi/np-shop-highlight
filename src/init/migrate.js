"use strict";

import { defaultAppConfig } from "../config/types/app-config";
import { load, save } from "../lib/store";
import { APP_CONFIG_KEY } from "../config/Constants";

migrateConfig();

function migrateConfig() {
  const defaults = defaultAppConfig();

  load(APP_CONFIG_KEY)
    .then(val => {
      if (!val)
        return defaults;

      apply(defaults, val);
      return val;
    })
    .then(v => {
      save(APP_CONFIG_KEY, v);
    })
}

function apply(a, b) {
  for (const key in a) {
    if (!a.hasOwnProperty(key))
      continue;

    if (!b.hasOwnProperty(key)) {
      b[key] = a[key];
    } else {
      if (Object.prototype.toString.call(b[key]) === '[object Object]'
        && Object.prototype.toString.call(a[key]) === '[object Object]') {
        apply(a[key], b[key])
      }
    }
  }
}