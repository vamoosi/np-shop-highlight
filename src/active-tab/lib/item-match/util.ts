import { Option } from "../../../lib/option";

function textContent(e: Element): Option<string> {
  return Option.maybe(e.textContent);
}

function getTitle(elem: HTMLElement): Option<string> {
  return Option.maybe(elem.children[1])
    .flatMap(textContent)
    .map(v => v.trim().toLowerCase());
}

export default { textContent, getTitle };