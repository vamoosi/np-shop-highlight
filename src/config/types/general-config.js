/**
 * @typedef {object} GeneralConfig
 *
 * @property {boolean} enabled
 *     Whether or not the entirety of this extension's
 *     functionality should be enabled
 */

/**
 * Creates a defaulted instance of the general configuration
 * object.
 *
 * @return {GeneralConfig}
 */
export function defaultGeneralConfig() {
  return {
    enabled: true
  };
}