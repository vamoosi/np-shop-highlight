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

export const NAME_KEY      = "name";
export const ID_KEY        = "id";
export const BG_COLOR_KEY  = "bgColor";
export const TXT_COLOR_KEY = "textColor";
export const OPACITY_KEY   = "opacity";

/**
 * Create a new defaulted highlight style object.
 *
 * @param {string} name
 * @param {number} id
 * @param {string} [bgCol="#fff"]
 * @param {string} [txtCol="#000"]
 * @param {number} [opac=100]
 *
 * @returns {HighlightStyle}
 */
export const newHighlightStyle = (
  name,
  id,
  bgCol = "#ffffff",
  txtCol = "#000000",
  opac = 100
) => ({
  [NAME_KEY]: name,
  [ID_KEY]: id,
  [BG_COLOR_KEY]: bgCol,
  [TXT_COLOR_KEY]: txtCol,
  [OPACITY_KEY]: opac
});
