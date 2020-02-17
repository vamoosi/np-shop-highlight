/**
 * @typedef {object} HighlightStyle
 *
 * @property {string} name
 *
 * @property {number} id
 *
 * @property {number} [opacity]
 *     The opacity level that should be applied to the
 *     highlighted element.  Represented as a decimal value
 *     from 0 to 1.
 *
 * @property {string} [bgColor]
 *     Background color that should be applied to the
 *     highlighted element in hex string format with the
 *     leading '#' character.
 *
 * @property {string} [textColor]
 *     Text color that should be applied to the highlighted
 *     element in hex string format with the leading '#'
 *     character.
 */

export const NAME_KEY = "name";
export const ID_KEY = "id";
export const BG_COLOR_KEY = "bgColor";
export const TXT_COLOR_KEY = "textColor";
export const OPACITY_KEY = "opacity";

/**
 * Create a new defaulted highlight style object.
 *
 * @param {string} name
 * @param {number} id
 * @param {string} [bgColor="#fff"]
 * @param {string} [textColor="#000"]
 * @param {number} [opacity=100]
 *
 * @returns {HighlightStyle}
 */
export const newHighlightStyle = (
  name,
  id,
  bgColor = "#ffffff",
  textColor = "#000000",
  opacity = 100
) => ({ name, id, bgColor, textColor, opacity });

/**
 * @param {HighlightStyle} style
 *
 * @return {HighlightStyle}
 */
export function copyHighlightStyle(style) {
  return newHighlightStyle(
    style.name,
    style.id,
    style.bgColor,
    style.textColor,
    style.opacity
  );
}
