import Storage from "../lib/store/static-store";
import { APP_CONFIG_KEY } from "../config/Constants";
import { AppConfig, defaultAppConfig } from "../config/types/app-config";
import { exists } from "../lib/util";

Storage.loadLocal<AppConfig>(APP_CONFIG_KEY)
  .then(o => o.orElseGet(defaultAppConfig))
  .then(v => {
    apply(defaultAppConfig(), v);
    return v;
  })
  .then(v => Storage.saveLocal(APP_CONFIG_KEY, v))
  .catch(console.log);

function apply(a: {[s: string]: any}, b: {[s: string]: any}) {
  for (const key in a) {
    if (!a.hasOwnProperty(key))
      continue;

    if (!b.hasOwnProperty(key)) {
      b[key] = a[key];
    } else {
      if (exists(b[key]) && b[key].toString() === 'object'
        && exists(a[key]) && a[key].toString() === 'object') {
        apply(a[key], b[key])
      }
    }
  }
}