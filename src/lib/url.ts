import strings from './strings'

function splitFragment(hash: string): {[key: string]: string} {
  hash = strings.trimLeft(hash, '#');
  const out: {[key: string]: string} = {};
  if (hash.length === 0)
    return {};

  for (const seg of hash.split(';')) {
    if (seg.length === 0)
      continue;

    const tmp = seg.split('=');

    if (tmp.length === 1)
      out[tmp[0]] = '';
    else
      out[tmp[0]] = tmp[1];
  }

  return out;
}

export default {
  get splitFragment() {return splitFragment;},
}