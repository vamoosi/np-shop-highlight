import {
  BG_COLOR_KEY, HighlightStyle,
  OPACITY_KEY,
  TXT_COLOR_KEY,
} from "../config/types/highlight-style";
import { exists } from "./util";

/**
 * Applies the given {@link HighlightStyle} to the given
 * {@link HTMLElement}.  Due to the DOM api, the
 * `HTMLElement` value may be null and this condition is
 * handled.
 *
 * @param style
 *        Style to apply to the given element
 *
 * @param element
 *        Nullable html element to which the given style
 *        should be applied.
 */
export function applyStyle(style: HighlightStyle, element: HTMLElement | null) {
  if (!element)
    return;

  if (exists(style[BG_COLOR_KEY]) && style[BG_COLOR_KEY] !== '') {
    // @ts-ignore
    element.style.backgroundColor = style[BG_COLOR_KEY];
  }
  if (exists(style[TXT_COLOR_KEY]) && style[TXT_COLOR_KEY] !== '') {
    // @ts-ignore
    element.style.color = style[TXT_COLOR_KEY];
  }
  if (exists(style[OPACITY_KEY]) && style[OPACITY_KEY] != '') {
    // @ts-ignore
    element.style.opacity = style[OPACITY_KEY];
  }
}