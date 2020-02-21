import { getConfig } from "../../../config/Configuration";
import { applyStyle } from "../../../lib/style";
import { debug } from "../../../lib/logging";
import { Option } from "../../../lib/option";

const WILDCARD = '*';

const tag    = (n: string) => __filename + ":" + n;
const tagIn  = (n: string) => tag(n) + ".start";
const tagOut = (n: string) => tag(n) + ".stop";

export async function handler(links: NodeListOf<HTMLAnchorElement>): Promise<void> {
  debug(tagIn("handler"), { links });

  const config = getConfig();
  const style = config.styles.values[config.itemMatch.groups["1"].styles[0].toString()];

  for (const item of config.itemMatch.groups["1"].items) {
    for (const link of links) {
      const td = link.parentElement;
      if (matches(td, item))
        applyStyle(style, td);
    }
  }

  debug(tagOut("handler"), null);
}

/**
 * Matches the given text against the given node.
 */
function matches(node: HTMLElement | null, text: string): boolean {
  if (text === '')
    return false;

  const val =  Option.maybe<HTMLElement>(node)
    .flatMap<string>(textContent)
    .orElse('');
  const wcl = text[0] === WILDCARD;
  const wcr = text[text.length - 1] === WILDCARD;
  const trm = wcl || wcr ? trimWildCard(text) : text;

  let out  = false;

  if (wcl)
    out = matchWildCardLeft(val, trm);
  if (!out && wcr)
    out = matchWildcardRight(val, trm);
  if (!out && !wcl && !wcr)
    out = val === trm;

  return out;
}

function matchWildCardLeft(text: string, test: string): boolean {
  return text.length > 0 && text.startsWith(test);
}

function matchWildcardRight(text: string, test: string): boolean {
  return text.length > 0 && text.endsWith(test);
}

function textContent(e: HTMLElement): Option<string> {
  return Option.maybe(e.textContent);
}

function trimWildCard(text: string): string {
  let left = 0;
  let right = text.length;

  for (const c of text)
    if (c === '*')
      left++;
    else
      break;

  for (let i = text.length - 1; i > -1; i--)
    if (text[i] === '*')
      right--;
    else
      break;

  return text.substring(left, right);
}