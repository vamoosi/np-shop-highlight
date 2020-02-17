/**
 * Locates all html elements matching the given input query.
 *
 * @param {string} query
 *
 * @return {NodeList}
 */
export function findAll(query) {
  return document.querySelectorAll(query);
}

/**
 * Locates all html elements matching the given input query
 * and transforms them using the given function, returning
 * an array of transformed items.
 *
 * Transforms returning undefined will be omitted from the
 * output array.
 *
 * @param {string} query
 * @param {function(Node):*} fn
 *
 * @return {*[]}
 */
export function findAndTransform(query, fn) {
  const res = findAll(query);
  const out = [];

  for (const item of res) {
    const tmp = fn(item);
    if (tmp !== undefined)
      out.push(tmp);
  }

  return out;
}