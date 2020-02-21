export interface MiniStockConfig {
  /**
   * Whether or not the MiniStock component of the
   * extension should be enabled.
   */
  enabled: boolean;

  /**
   * The style that should be applied to new items from
   * the previous page refresh.
   */
  staleStyle: number;

  /**
   * The style that should be applied to new items from
   * the most recent refresh.
   */
  freshStyle: number;

  /**
   * Enable highlighting "fresh" items from the last
   * refresh.
   */
  enableFresh: boolean;

  /**
   * Enable highlighting "stale" items from the refresh
   * before last.
   */
  enableStale: boolean;
}

/**
 * Creates a defaulted instance of a MiniStockConfig
 * object.
 */
export function defaultMiniStockConfig(): MiniStockConfig {
  return {
    enabled: true,

    enableFresh: true,
    freshStyle: 1,

    enableStale: true,
    staleStyle: 2,
  };
}