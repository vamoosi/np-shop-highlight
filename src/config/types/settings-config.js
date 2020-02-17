/**
 * @typedef {object} SettingsConfig
 *
 * @property {string} title
 *     The page title for the settings menu.
 */

/**
 * Creates a defaulted instance of the SettingsConfig
 * object.
 *
 * @return {SettingsConfig}
 */
export function defaultSettingsConfig() {
  return {
    title: "Settings"
  };
}