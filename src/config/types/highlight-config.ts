import {
  HighlightStyle,
  newHighlightStyle, StyleId,
} from "./highlight-style";

export interface HighlightConfig {
  order: Array<StyleId>;
  values: { [key: string]: HighlightStyle }
}

/**
 * Creates a defaulted instance of the a highlight config
 * object.
 *
 * @return {HighlightConfig}
 */
export function defaultHighlightConfig() {
  return {
    order: [ 1, 2 ],
    values: {
      "1": newHighlightStyle(1, "Fresh Item", "#58ff89"),
      "2": newHighlightStyle(2, "Stale Item", "#f4ff79"),
    },
  };
}
