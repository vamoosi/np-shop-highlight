const WILDCARD = "*";

const matchWildCardLeft = (x: string, t: string) => x.length > 0 && x.endsWith(t);
const matchWildcardRight = (x: string, t: string) => x.length > 0 && x.startsWith(t);
const hasWildcardRight = (x: string) => x[x.length - 1] === WILDCARD;
const hasWildcardLeft = (x: string) => x[0] === WILDCARD;

function expandWildcard(text: string): string {
  return text.replace(/\*/g, ".*");
}

function trimWildCard(text: string): string {
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

  return text.substring(left, right);
}

export default {
  expandWildcard,
  matchWildcardRight,
  matchWildCardLeft,
  hasWildcardRight,
  hasWildcardLeft,
  trimWildCard
};