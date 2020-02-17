/**
 * @param {HighlightStyle} style
 * @param {HTMLElement} element
 */
import {
  BG_COLOR_KEY,
  OPACITY_KEY,
  TXT_COLOR_KEY
} from "../config/types/highlight-style";

export function applyStyle(style, element) {
  if (style.hasOwnProperty(BG_COLOR_KEY))
    element.style.backgroundColor = style[BG_COLOR_KEY];
  if (style.hasOwnProperty(TXT_COLOR_KEY))
    element.style.color = style[TXT_COLOR_KEY];
  if (style.hasOwnProperty(OPACITY_KEY))
    element.style.opacity = `${style[OPACITY_KEY]}%`;
}