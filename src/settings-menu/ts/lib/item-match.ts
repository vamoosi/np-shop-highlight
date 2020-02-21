const LINE_END_PATTERN = / +\n|\n{2,}/g;
const LINE_END_REPLACE = '\n';
const LINE_START_PATTERN = /^ +/gm;
const LINE_START_REPLACE = '';
const SPLIT_PATTERN = '\n';

export function cleanItemString(input: string): string {
  return input.trim()
    .replace(LINE_START_PATTERN, LINE_START_REPLACE)
    .replace(LINE_END_PATTERN, LINE_END_REPLACE);
}

export function toItemArray(input: string): Array<string> {
  return input.split(SPLIT_PATTERN);
}