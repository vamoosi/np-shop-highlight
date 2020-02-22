const LINE_END_PATTERN = /^(\r?\n|\r) +(\r?\n|\r)|(\r?\n|\r){2,}/g;
const LINE_END_REPLACE = "\n";
const LINE_START_PATTERN = /^ +/gm;
const LINE_START_REPLACE = "";
const SPLIT_PATTERN = "\n";

export default {
  cleanItemString(input: string): string {
    return input.trim()
      .replace(LINE_START_PATTERN, LINE_START_REPLACE)
      .replace(LINE_END_PATTERN, LINE_END_REPLACE);
  },

  toItemArray(input: string): Array<string> {
    return input.split(SPLIT_PATTERN);
  }
};
