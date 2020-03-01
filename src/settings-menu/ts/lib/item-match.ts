const LINE_END_PATTERN = / *(\r?\n|\r)/gm;
const LINE_END_REPLACE = "\n";
const EMPTY_LINE_PATTERN = /^(\r?\n|\r) +(\r?\n|\r)/gm;
const EMPTY_LINE_REPLACE = "";
const LINE_START_PATTERN = /^ +/gm;
const LINE_START_REPLACE = "";
const SPLIT_PATTERN = "\n";

export default {
  cleanItemString(input: string): string {
    return input.trim()
      .replace(EMPTY_LINE_PATTERN, EMPTY_LINE_REPLACE)
      .replace(LINE_START_PATTERN, LINE_START_REPLACE)
      .replace(LINE_END_PATTERN, LINE_END_REPLACE);
  },

  toItemArray(input: string): Array<string> {
    return input.split(SPLIT_PATTERN);
  }
};
