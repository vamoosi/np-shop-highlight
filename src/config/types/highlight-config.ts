import {
  HighlightStyle,
  newHighlightStyle
} from "./highlight-style";

export interface HighlightConfig {
  order: Array<number>;
  values: {[key: string]: HighlightStyle}
}

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
      "1": newHighlightStyle(1, "Fresh Item", "#58ff89"),
      "2": newHighlightStyle(2, "Stale Item", "#f4ff79"),
    },
  };
}

export function nextHighlightId(conf: HighlightConfig): number {
  let out = 0;
  for (const i of conf.order)
    if (i > out)
      out = i;
  return out + 1;
}

export function appendHighlight(
  config: HighlightConfig,
  style: HighlightStyle
): HighlightConfig {
  if (alreadyContains(config.order, style.id))
    throw "Cannot append style with conflicting id. "
      + `Attempted to append ${style.id} to ${JSON.stringify(config.order)}`;

  const out = copyConfig(config);
  out.order.push(style.id);
  out.values[style.id.toString()] = style;
  return out;
}

export function removeHighlight(
  config: HighlightConfig,
  id: number
): HighlightConfig {
  return {
    order: copyOmitOrder(config.order, id),
    values: copyOmitValues(config.values, id.toString())
  };
}

function copyConfig(config: HighlightConfig): HighlightConfig {
  return {
    order: copyOrder(config.order),
    values: copyValues(config.values)
  };
}

function alreadyContains(order: Array<number>, id: number): boolean {
  for (const i of order)
    if (i === id)
      return true;
  return false;
}

function copyOmitOrder(order: Array<number>, id: number): Array<number> {
  const out = [];

  for (let i = 0; i < order.length; i++)
    if (order[i] !== id)
      out.push(order[i]);

  return out;
}

function copyOrder(order: Array<number>): Array<number> {
  return order.slice();
}

function copyOmitValues(
  values: {[k: string]: HighlightStyle},
  omit: string
): {[k: string]: HighlightStyle} {
  const out: {[k: string]: HighlightStyle} = {};

  for (const key in values) {
    if (!values.hasOwnProperty(key) || key === omit)
      continue;

    out[key] = values[key];
  }
  return out;
}

// TODO: Remove this
function copyValues(values: {[k: string]: HighlightStyle}) {
  const out: {[k: string]: HighlightStyle} = {};
  for (const key in values) {
    if (!values.hasOwnProperty(key))
      continue;

    out[key] = values[key];
  }
  return out;
}
