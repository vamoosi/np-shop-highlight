export interface GeneralConfig {
  /**
   * Whether or not the entirety of this extension's
   * functionality should be enabled.
   */
  enabled: boolean;

  debug: boolean;
}

/**
 * Creates a defaulted instance of the general configuration
 * object.
 */
export function defaultGeneralConfig(): GeneralConfig {
  return {
    enabled: true,
    debug: true,
  };
}