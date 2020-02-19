export function arrayCopy(arr) {
  const out = new Array(arr.length);

  for (let i = 0; i < arr.length; i++)
    out[i] = arr[i];

  return out;
}

export function arrayOmit(arr, val) {
  const out = [];

  for (const v of out)
    if (v !== val)
      out.push(v);

  return out;
}