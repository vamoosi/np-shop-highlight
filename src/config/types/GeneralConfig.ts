export interface GeneralConfig {
  /**
   * Whether or not the entirety of this extension's
   * functionality should be enabled.
   */
  enabled: boolean;

  /**
   * Currently known plugin version.
   */
  version: string;

  features: {
    itemMatch: boolean;
    miniStock: boolean;
  };
}

/**
 * Creates a defaulted instance of the general configuration
 * object.
 */
export function defaultGeneralConfig(): GeneralConfig {
  return {
    enabled: true,
    version: '1.4.1',
    features: {
      itemMatch: false,
      miniStock: true,
    }
  };
}