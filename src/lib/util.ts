export function arrayCopy<T>(arr: Array<T>): Array<T> {
  const out = new Array(arr.length);

  for (let i = 0; i < arr.length; i++)
    out[i] = arr[i];

  return out;
}

export function lossyClone<T>(val: T): T {
  return <T>JSON.parse(JSON.stringify(val));
}

export function exists(v: any): boolean {
  return v !== undefined && v !== null;
}