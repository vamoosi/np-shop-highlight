import {
  BG_COLOR_KEY, HighlightStyle,
  OPACITY_KEY,
  TXT_COLOR_KEY
} from "../config/types/highlight-style";
import { debug } from "./logging";

const tag    = (n: string) => __filename + ':' + n;
const tagIn  = (n: string) => tag(n) + ".start";
const tagOut = (n: string) => tag(n) + ".stop";

export function applyStyle(style: HighlightStyle, element: HTMLElement | null) {
  debug(tagIn("applyStyle"), {style, element});
  if (!element) {
    debug(tagOut("applyStyle"), "Null element, bailing early");
    return;
  }

  if (style.hasOwnProperty(BG_COLOR_KEY))
    element.style.backgroundColor = style[BG_COLOR_KEY];
  if (style.hasOwnProperty(TXT_COLOR_KEY))
    element.style.color = style[TXT_COLOR_KEY];
  if (style.hasOwnProperty(OPACITY_KEY))
    element.style.opacity = `${style[OPACITY_KEY]}%`;

  debug(tagOut("applyStyle"), null);
}