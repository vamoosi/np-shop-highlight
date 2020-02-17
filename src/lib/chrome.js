/**
 * @param {string} key
 * @param {*} value
 * @return {Promise<void>}
 */
export async function storeLocal(key, value) {
  return chrome.storage.local.set({ [key]: value })
}

/**
 * Load the value stored at the given key from the browser
 * store.
 *
 * @param {string} key
 *
 * @returns {Promise<object>}
 */
export async function loadLocal(key) {
  return new Promise(g => chrome.storage.local.get(key.toString(), g)).then(o => o[key])
}

export function subscribe(key, fn) {
  const iter = Array.isArray(key) ? key : [key];

  chrome.storage.onChanged.addListener(change => {
    const pass = {};

    for (let i = 0; i < iter.length; i++) {
      if (change.hasOwnProperty(key[i])) {
        pass[key[i]] = change[key[i]];
      }
    }

    fn(pass);
  });
}