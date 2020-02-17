/**
 * @typedef {object} HighlightConfig
 *
 * @property {[number]} order
 *
 * @property {Map<string, HighlightStyle>} values
 */

import { copyHighlightStyle, newHighlightStyle } from "./highlight-style";

/**
 * Creates a defaulted instance of the a highlight config
 * object.
 *
 * @return {HighlightConfig}
 */
export function defaultHighlightConfig() {
  return {
    order: [1, 2],
    values: {
      "1": newHighlightStyle("Fresh Item", 1, "#58ff89"),
      "2": newHighlightStyle("Stale Item", 2, "#f4ff79"),
    },
  };
}

/**
 * @param {HighlightConfig} conf
 */
export function nextHighlightId(conf) {
  let out = 0;
  for (const i of conf.order)
    if (i > out)
      out = i;
  return out + 1;
}

/**
 * @param {HighlightConfig} config
 * @param {HighlightStyle} style
 */
export function appendHighlight(config, style) {
  if (alreadyContains(config.order, style.id))
    throw "Cannot append style with conflicting id. "
      + `Attempted to append ${style.id} to ${JSON.stringify(config.order)}`;

  const out = copyConfig(config);
  out.order.push(style.id);
  out.values[style.id.toString()] = style;
  return out;
}

/**
 * @param {HighlightConfig} config
 * @param {number} id
 *
 * @return {HighlightConfig}
 */
export function removeHighlight(config, id) {
  return {
    order: copyOmitOrder(config.order, id),
    values: copyOmitValues(config.values, id.toString())
  };
}

/**
 * @param {HighlightConfig} config
 *
 * @return {HighlightConfig}
 */
function copyConfig(config) {
  return {
    order: copyOrder(config.order),
    values: copyValues(config.values)
  };
}

/**
 * @param {number[]} order
 * @param {number} id
 * @return {boolean}
 */
function alreadyContains(order, id) {
  for (const i of order)
    if (i === id)
      return true;
  return false;
}

/**
 * @param {number[]} order
 * @param {number} id
 * @return {number[]}
 */
function copyOmitOrder(order, id) {
  const out = [];

  for (let i = 0; i < order.length; i++)
    if (order[i] !== id)
      out.push(order[i]);

  return out;
}

/**
 * @param {number[]} order
 * @return {number[]}
 */
function copyOrder(order) {
  return order.slice();
}

/**
 * @param {Map<string,HighlightStyle>} values
 * @param {string} omit
 * @return {Map<string,HighlightStyle>}
 */
function copyOmitValues(values, omit) {
  const out = {};
  for (const key in values) {
    if (!values.hasOwnProperty(key) || key === omit)
      continue;

    out[key] = copyHighlightStyle(values[key]);
  }
  return out;
}

/**
 * @param {Map<string,HighlightStyle>} values
 * @return {Map<string,HighlightStyle>}
 */
function copyValues(values) {
  const out = {};
  for (const key in values) {
    if (!values.hasOwnProperty(key))
      continue;

    out[key] = copyHighlightStyle(values[key]);
  }
  return out;
}
