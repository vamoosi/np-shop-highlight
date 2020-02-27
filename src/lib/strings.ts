function trimLeft(tgt: string, char: string): string {
  if (char.length === 0 || tgt.length === 0)
    return tgt;

  const t = char[0];

  if (tgt[0] !== t)
    return tgt;

  for (let i = 1; i < tgt.length; i++)
    if (tgt[i] !== t)
      return tgt.substring(i);

  return '';
}

function trimRight(tgt: string, char: string): string {
  if (char.length === 0 || tgt.length === 0)
    return tgt;

  const t = char[0];
  const l = tgt.length - 1;

  if (tgt[l] !== t)
    return tgt;

  for (let i = l; i > -1; i--)
    if (tgt[i] !== t)
      return tgt.substring(0, i + 1);

  return '';
}

function trim(tgt: string, char: string): string {
  return trimLeft(trimRight(tgt, char), char);
}

export default {
  get trimLeft() {return trimLeft;},
  get trimRight() {return trimRight;},
  get trim() {return trim;},
}