import { exists } from "./util";

export enum LogLevel {
  DEBUG = 1 << 0,
  INFO = 1 << 1,
  WARN = 1 << 2,
  ERROR = 1 << 3,
}

let logLevel: LogLevel = LogLevel.WARN;
let filter: RegExp = /.*/;

/**
 * Sets the global logging level threshold.
 *
 * Log statements below this threshold will not be printed.
 *
 * @param level
 *        New log level threshold value
 */
export function setLogLevel(level: LogLevel) {
  logLevel = level;
}

/**
 * Sets a global log filter pattern to apply to all logging.
 *
 * Any log tag, regardless of {@link LogLevel} will be
 * omitted if it does not match this pattern.
 *
 * @param pattern
 *        New regex pattern to match log tags against.
 */
export function setFilter(pattern: RegExp) {
  filter = pattern;
}

/**
 * Logs the given message at the {@link LogLevel.DEBUG} log
 * level.
 *
 * @param tag
 *        Log origin tag.
 *
 * @param v
 *        Log value/message.
 *
 * @return the input value `v`
 */
export const debug = <T>(tag: string, v: T): T => log(LogLevel.DEBUG, tag, v);

/**
 * Logs the given message at the {@link LogLevel.INFO} log
 * level.
 *
 * @param tag
 *        Log origin tag.
 *
 * @param v
 *        Log value/message.
 *
 * @return the input value `v`
 */
export const info = <T>(tag: string, v: T): T => log(LogLevel.INFO, tag, v);

/**
 * Logs the given message at the {@link LogLevel.WARN} log
 * level.
 *
 * @param tag
 *        Log origin tag.
 *
 * @param v
 *        Log value/message.
 *
 * @return the input value `v`
 */
export const warn = <T>(tag: string, v: T): T => log(LogLevel.WARN, tag, v);

/**
 * Logs the given message at the {@link LogLevel.ERROR} log
 * level.
 *
 * @param tag
 *        Log origin tag.
 *
 * @param v
 *        Log value/message.
 *
 * @return the input value `v`
 */
export const error = <T>(tag: string, v: T): T => log(LogLevel.ERROR, tag, v);

/**
 * Logs the given message at the {@link LogLevel.ERROR} log
 * level and throws a new {@link Error} with that message.
 *
 * @param message
 *        Error message to log and throw.
 *
 * @param value
 *        An optional additional value to log
 */
export function fatal(message: string, value?: any) {
  if (has(LogLevel.ERROR) && exists(value))
    console.log(LogLevel[LogLevel.ERROR], value);

  throw new Error(message);
}

/**
 * Logs the given tag and value at the provided
 * {@link LogLevel}.
 *
 * @param lvl
 *        {@link LogLevel} at which this message should be logged
 * @param tag
 *        Log origin tag.
 * @param val
 *        Log value.
 */
export function log<T>(lvl: LogLevel, tag: string, val: T): T {
  if (has(lvl) && filter.test(tag))
    if (exists(val))
      console.log(LogLevel[lvl], tag, val);
    else
      console.log(LogLevel[lvl], tag);

  return val;
}

function has(l: LogLevel): boolean {
  return (logLevel & l) > 0;
}