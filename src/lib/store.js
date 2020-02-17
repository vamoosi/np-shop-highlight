const browser = (chrome && chrome.storage)
  ? require('./chrome')
  : require('./dummy');


/**
 * Load the value stored at the given key from the browser
 * store.
 *
 * @param {string} key
 *
 * @returns {Promise<object>}
 */
export async function load(key) {
  return browser.loadLocal(key.toString());
}

/**
 * Save the given data in the browser store with the given
 * key as the identifier.
 *
 * @param {string} key
 * @param {*} data
 *
 * @returns {Promise<void>}
 */
export async function save(key, data) {
  return browser.storeLocal(key, data);
}

export function subscribe(key, fn) {
  browser.subscribe(key, fn);
}