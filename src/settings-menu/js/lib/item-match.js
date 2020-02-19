const LINE_END_PATTERN = / +\n|\n{2,}/g;
const LINE_END_REPLACE = '\n';
const LINE_START_PATTERN = /^ +/g;
const LINE_START_REPLACE = '';
const SPLIT_PATTERN = '\n';

/**
 * @param {string} input
 *
 * @return {string}
 */
export function cleanItemString(input) {
  return input.trim()
    .replace(LINE_START_PATTERN, LINE_START_REPLACE)
    .replace(LINE_END_PATTERN, LINE_END_REPLACE);
}

/**
 * @param {string} input
 *
 * @return {string[]}
 */
export function toItemArray(input) {
  return input.split(SPLIT_PATTERN);
}