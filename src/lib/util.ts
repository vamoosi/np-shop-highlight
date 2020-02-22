export function arrayOmit<T>(a: Array<T>, v: T): Array<T> {
  const out: Array<T> = [];
  for (const t of a)
    if (t !== v)
      out.push(t);
  return out;
}

export function lossyClone<T>(val: T): T {
  return <T>JSON.parse(JSON.stringify(val));
}

export function exists(v: any): boolean {
  return v !== undefined && v !== null;
}