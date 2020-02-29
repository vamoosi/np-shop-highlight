import Storage from "../lib/store/static-store";
import { APP_CONFIG_KEY } from "../config/Constants";
import { AppConfig, defaultAppConfig } from "../config/types/app-config";
import { arrayUniq } from "../lib/util";

interface Migration {
  readonly version: string;

  apply(appConfig: AppConfig): void;
}

const migrations: Array<Migration> = [
  { version: "1.4.1", apply: _ => {} },
  {
    version: "1.4.2",
    apply: c => {
      if (c.itemMatch.order.length == 0)
        c.itemMatch.order.push(1);
      c.general.features = {
        miniStock: (<any> c.miniStock).enabled || true,
        itemMatch: (<any> c.itemMatch).enabled || false,
      };
      c.itemMatch.groups["1"].enabled = true;

      delete (<any> c.miniStock)["enabled"];
      delete (<any> c.itemMatch)["enabled"];
    },
  },
  {
    version: "1.5.3",
    apply: c => {c.itemMatch.order = arrayUniq(c.itemMatch.order)}
  }
];

function applyMigrations(appConf: AppConfig): AppConfig {
  let apply = false;
  for (let i = 0; i < migrations.length; i++) {
    if (migrations[i].version === (appConf.general.version || "1.4.1")) {
      apply = true;
    } else if (apply) {
      migrations[i].apply(appConf);
      appConf.general.version = migrations[i].version;
    }
  }
  return appConf;
}

Storage.loadLocal<AppConfig>(APP_CONFIG_KEY)
  .then(o => o.orElseGet(defaultAppConfig))
  .then(applyMigrations)
  .then(v => Storage.saveLocal(APP_CONFIG_KEY, v))
  .catch(console.log);
