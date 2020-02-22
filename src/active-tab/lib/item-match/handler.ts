import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";
import { debug, debugIn, debugOut, debugOutVoid } from "../../../lib/logging";
import { Option } from "../../../lib/option";

const WILDCARD = "*";

const tag = (n: string) => __filename + ":" + n;

export async function handler(links: NodeListOf<HTMLAnchorElement>): Promise<void> {
  debugIn(tag("handler"), { links });

  const config = getConfig();
  const style = config.styles.values[config.itemMatch.groups["1"].styles[0].toString()];

  for (const item of config.itemMatch.groups["1"].items) {
    for (const link of links) {
      const td = link.parentElement;
      if (matches(td, item))
        applyStyle(style, td);
    }
  }

  debugOutVoid(tag("handler"));
}

/**
 * Matches the given text against the given node.
 */
function matches(node: HTMLElement | null, text: string): boolean {
  debugIn(tag(matches.name), { node, text });
  if (text === "") {
    console.log(tag(matches.name), "Empty string, exit early");
    return false;
  }

  const val = Option.maybe<HTMLElement>(node)
    .flatMap<string>(getTitle)
    .orElse("");
  const wcl = text[0] === WILDCARD;
  const wcr = text[text.length - 1] === WILDCARD;
  const trm = wcl || wcr ? trimWildCard(text) : text;

  debug("matches", {wcl, wcr, trm});
  let out = false;

  if (wcl)
    out = matchWildCardLeft(val, trm);
  if (!out && wcr)
    out = matchWildcardRight(val, trm);
  if (!out && !wcl && !wcr)
    out = val === trm;

  return debugOut(tag(matches.name), out);
}

function matchWildCardLeft(text: string, test: string): boolean {
  debugIn("matchWildCardLeft", { text, test });
  return debugOut("matchWildCardLeft", text.length > 0 && text.endsWith(test));
}

function matchWildcardRight(text: string, test: string): boolean {
  debugIn("matchWildcardRight", { text, test });
  return debugOut("matchWildcardRight", text.length > 0 && text.startsWith(test));
}

function textContent(e: Element): Option<string> {
  debugIn("textContent", {e});
  return debugOut("textContent", Option.maybe(e.textContent));
}

function trimWildCard(text: string): string {
  debugIn("trimWildCard", {text});
  let left = 0;
  let right = text.length;

  for (const c of text)
    if (c === WILDCARD)
      left++;
    else
      break;

  for (let i = text.length - 1; i > -1; i--)
    if (text[i] === WILDCARD)
      right--;
    else
      break;

  return debugOut("trimWildCard", text.substring(left, right));
}

function getTitle(td: HTMLElement): Option<string> {
  debugIn("getTitle", {td});
  return debugOut("getTitle", Option.maybe(td.children[1]).flatMap(textContent));
}