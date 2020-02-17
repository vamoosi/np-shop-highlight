"use strict";

/**
 * @param {string} key
 * @param {*} value
 * @return {Promise<void>}
 */
export async function storeLocal(key, value) {
  console.log(`storeLocal: ${key} => ${JSON.stringify(value)}`);
  return Promise.resolve();
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
  console.log(`loadLocal: ${key}`);
  return Promise.resolve(null);
}

export function subscribe(key, fn) {
  console.log(`subscribe: ${key} => ${fn}`);
}