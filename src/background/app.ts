import Storage from "../lib/store/static-store";
import { APP_CONFIG_KEY } from "../config/Constants";
import { AppConfig, defaultAppConfig } from "../config/types/app-config";
import { arrayUniq } from "../lib/util";

/**
 * A Migration represents a set of changes to the contents
 * or structure of this plugin's configuration.
 *
 * Each migration will receive the current configuration for
 * the plugin and mutate that config to meet the
 * requirements or expectations of a new version of the
 * plugin.
 */
interface Migration {
  readonly version: string;

  apply(appConfig: AppConfig): void;
}

/**
 * List of migrations so far.
 *
 * Migrations will be added to this list as the plugin is
 * updated.
 */
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

/**
 * Apply migrations iterates through the list of migrations
 * and applies all migrations, in order for versions that
 * are higher than the previously known plugin version.
 *
 * @param {AppConfig} appConf Plugin configuration.
 *
 * @return the updated application config.
 */
function applyMigrations(appConf: AppConfig): AppConfig {
  // Start the apply flag at false to avoid attempting to
  // apply migrations for version older than the previously
  // known plugin version.
  let apply = false;

  for (let i = 0; i < migrations.length; i++) {
    // If the migration we are currently looking at is equal
    // to the previously known plugin version, mark the
    // apply flag to true so all subsequent migrations will
    // be run.
    if (migrations[i].version === (appConf.general.version || "1.4.1")) {
      apply = true;
      continue;
    }

    // If the apply flag is set to true, then we have hit a
    // migration for a version after the previously known
    // version of this plugin.
    //
    // Apply the migration, and update the plugin's known
    // version to the version attached to the migration.
    if (apply) {
      migrations[i].apply(appConf);
      appConf.general.version = migrations[i].version;
    }
  }

  return appConf;
}

/**
 * Background script to load the plugin configuration, apply
 * any migrations and store the updated config to the
 * browser.
 */
Storage.loadLocal<AppConfig>(APP_CONFIG_KEY)
  .then(o => o.orElseGet(defaultAppConfig))
  .then(applyMigrations)
  .then(v => Storage.saveLocal(APP_CONFIG_KEY, v))
  .catch(console.log);
