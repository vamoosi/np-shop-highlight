import { exists } from "./util";

export enum LogLevel {
  DEBUG,
  ERROR,
}

const BEGIN = "Begin ";
const END   = "End   ";
const DEBUG = "Debug ";

let logLevel: LogLevel = LogLevel.ERROR;
let stack: number = 0;

const tag = (n: string) => __filename + ":" + n;

/**
 * Sets the global logging level threshold.
 *
 * Log statements below this threshold will not be printed.
 *
 * @param level
 *        New log level threshold value
 */
export function setLogLevel(level: LogLevel) {
  debugIn(tag(setLogLevel.name), {level});
  logLevel = level;
  debugOutVoid(tag(setLogLevel.name));
}

export function debug(tag: string, v?: any) {
  if (logLevel > LogLevel.DEBUG)
    return;

  superTopSecretPrivateLog(DEBUG + tag, v);
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
export function debugIn(tag: string, v?: object) {
  stack++;
  if (logLevel > LogLevel.DEBUG)
    return;

  superTopSecretPrivateLog(BEGIN + tag, v);
}

export function debugOutVoid(tag: string) {
  if (logLevel == LogLevel.DEBUG)
    superTopSecretPrivateLog(END + tag);
  stack--;
}

export function debugOut<T>(tag: string, v: T): T {
  if (logLevel === LogLevel.DEBUG)
    superTopSecretPrivateLog(END + tag, v);

  stack--;
  return v;
}

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
  if (logLevel === LogLevel.ERROR && exists(value))
    console.log(LogLevel[LogLevel.ERROR], value);

  throw new Error(message);
}

function superTopSecretPrivateLog(tag: string, v?: any) {
  if (exists(v))
    console.log(pad() + tag, v);
  else
    console.log(pad() + tag);
}

const indent = "  ";
const pads = [""];
function pad(): string {
   if (pads.length < stack) {
     pads.push(pads[stack - 2] + indent);
   }
   return pads[stack - 1];
}
