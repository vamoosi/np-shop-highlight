import { Option } from "../../../lib/option";

function textContent(e: Element): Option<string> {
  return Option.maybe(e.textContent);
}

function getTitle(td: HTMLElement): Option<string> {
  return Option.maybe(td.children[1]).flatMap(textContent);
}

export default { textContent, getTitle };