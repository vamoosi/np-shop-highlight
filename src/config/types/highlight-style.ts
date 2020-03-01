export const BG_COLOR_KEY = "bgColor";
export const TXT_COLOR_KEY = "textColor";
export const OPACITY_KEY = "opacity";

export type StyleId = number;

export interface HighlightStyle {
  id: StyleId;
  name: string;

  /**
   * The opacity level that should be applied to the
   * highlighted element.  Represented as a decimal value
   * from 0 to 100.
   */
  opacity: string;

  /**
   * Background color that should be applied to the
   * highlighted element in hex string format with the
   * leading '#' character.
   */
  bgColor: string;

  /**
   * Text color that should be applied to the highlighted
   * element in hex string format with the leading '#'
   * character.
   */
  textColor: string;
}


export function newHighlightStyle(
  id: StyleId,
  name: string,
  bgColor = "#ffffff",
  textColor = "#000000",
  opacity = 100,
): HighlightStyle {
  return  { name, id, bgColor, textColor, opacity: (opacity / 100).toString() };
}
