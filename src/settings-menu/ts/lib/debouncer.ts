/**
 * @param {function():undefined} onTimeout
 *     Function to be called on timeout conclusion
 * @param {number} [delay]
 *     Debounce delay in milliseconds
 * @param {function(Event): void} cb
 *     Optional callback to fire when the debounce
 *     triggering event is fired.
 *
 * @return {function(Event): void}
 *     Function to be called by the input events that should
 *     be debounced.
 */
export function newDebouncer(
  onTimeout: () => void,
  delay: number = 500,
  cb?: (e: Event) => void,
): (e: Event) => void {
  let timeout: number;

  return e => {
    clearTimeout(timeout);
    timeout = window.setTimeout(onTimeout, delay);
    if (cb) cb(e);
  };
}