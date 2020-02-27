function isNone<T>(val: T): boolean {
  return val === undefined || val === null;
}

export class Option<T> {
  private readonly value: T = <T>{};
  private readonly none: boolean;

  private constructor(val?: T) {
    if (val !== undefined && val !== null) {
      this.value = val;
      this.none = false;
    } else {
      this.none = true;
    }
  }

  public isNone(): boolean {
    return this.none;
  }

  public isSome(): boolean {
    return !this.none;
  }

  public unwrap(): T {
    if (this.isNone())
      throw new Error("Cannot unwrap an option of none");
    return this.value;
  }

  public map<R>(fn: (v: T) => R): Option<R> {
    if (this.isNone())
      return new Option<R>();
    return new Option<R>(fn(this.value));
  }

  public flatMap<R>(fn: (v: T) => Option<R>): Option<R> {
    if (this.isNone())
      return Option.none();
    return fn(this.value);
  }

  public ifSome(fn: (v: T) => void): Option<T> {
    if (this.isSome())
      fn(this.value);
    return this;
  }

  public ifNone(fn: () => void): Option<T> {
    if (this.isNone())
      fn();
    return this;
  }

  public orElse(val: T): T {
    return this.isNone() ? val : this.value;
  }

  public orElseGet(fn: () => T): T {
    if (typeof fn !== "function")
      throw new Error("Passed callback was not a function");
    if (this.isNone())
      return fn();

    return this.value;
  }

  public static some<T>(val: T): Option<T> {
    if (isNone(val))
      throw new Error("Passed a value of none to Option.some()");
    return new Option(val);
  }

  public static none<T>(): Option<T> {
    return new Option<T>();
  }

  public static maybe<T>(val?: T | null): Option<T> {
    if (val === undefined || val === null)
      return Option.none();
    return Option.some(val);
  }

  public static objectGet<T>(obj: { [key: string]: T }, key: string): Option<T> {
    return isNone(obj) ? Option.none() : Option.maybe(obj[key]);
  }
}