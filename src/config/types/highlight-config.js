/**
 * @typedef {object} HighlightConfig
 *
 * @property {[number]} order
 *
 * @property {{[string], HighlightStyle}} values
 */

import { newHighlightStyle } from "./highlight-style";

/**
 * Creates a defaulted instance of the a highlight config
 * object.
 *
 * @return {HighlightConfig}
 */
export function defaultHighlightConfig() {
  return {
    order: [1, 2],
    values: {
      "1": newHighlightStyle("Fresh Item", 1, "#58ff89"),
      "2": newHighlightStyle("Stale Item", 2, "#f4ff79"),
    },
  };
}
