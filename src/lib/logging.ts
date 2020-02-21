import { exists } from "./util";

export enum LogLevel {
  DEBUG = 1 << 0,
  INFO = 1 << 1,
  WARN = 1 << 2,
  ERROR = 1 << 3,
}

let logLevel: LogLevel = LogLevel.WARN;
let filter: RegExp = /.*/;

export function setLogLevel(l: LogLevel) {
  logLevel = l;
}

export function setFilter(p: RegExp) {
  filter = p;
}

export const debug = <T>(tag: string, v: T): T => log(LogLevel.DEBUG, tag, v);
export const info = <T>(tag: string, v: T): T => log(LogLevel.INFO, tag, v);
export const warn = <T>(tag: string, v: T): T => log(LogLevel.WARN, tag, v);
export const error = <T>(tag: string, v: T): T => log(LogLevel.ERROR, tag, v);

export function fatal(message: string, v?: any) {
  if (has(LogLevel.ERROR) && exists(v))
    console.log(LogLevel[LogLevel.ERROR], v);

  throw new Error(message);
}


export function log<T>(l: LogLevel, tag: string, v: T): T {
  if (has(l) && filter.test(tag))
    if (exists(v))
      console.log(LogLevel[l], tag, v);
    else
      console.log(LogLevel[l], tag);

  return v;
}

function has(l: LogLevel): boolean {
  return (logLevel & l) > 0;
}