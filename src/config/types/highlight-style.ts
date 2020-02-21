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
  opacity: number;

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
  id: number,
  name: string,
  bgColor:string = "#ffffff",
  textColor:string = "#000000",
  opacity:number = 100
): HighlightStyle {
  return { name, id, bgColor, textColor, opacity };
}
