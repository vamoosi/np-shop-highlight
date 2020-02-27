import { exists } from "../../lib/util";

export const NAME_KEY = "name";
export const ID_KEY = "id";
export const BG_COLOR_KEY = "bgColor";
export const TXT_COLOR_KEY = "textColor";
export const OPACITY_KEY = "opacity";

export interface HighlightStyle {
  id: number;
  name: string;

  /**
   * The opacity level that should be applied to the
   * highlighted element.  Represented as a decimal value
   * from 0 to 100.
   */
  opacity?: string;

  /**
   * Background color that should be applied to the
   * highlighted element in hex string format with the
   * leading '#' character.
   */
  bgColor?: string;

  /**
   * Text color that should be applied to the highlighted
   * element in hex string format with the leading '#'
   * character.
   */
  textColor?: string;
}


export function newHighlightStyle(
  id: number,
  name: string,
  bgColor?: string,
  textColor?: string,
  opacity?: number,
): HighlightStyle {
  const out: HighlightStyle = { name, id };
  if (exists(bgColor))
    out.bgColor = bgColor;
  if (exists(textColor))
    out.textColor = textColor;
  if (exists(opacity)) {
      // @ts-ignore
      out.opacity = (opacity / 100).toString()
  }
  return out;
}
