import {
  BG_COLOR_KEY,
  HighlightStyle,
  OPACITY_KEY,
  TXT_COLOR_KEY,
} from "../../config/types/highlight-style";

export interface StorableItemRef {
  readonly name: string;
  readonly stockId: string;
  readonly infoId: string;
  readonly cost: string;
  readonly inStock: string;
}

export interface StorableRefMap {
  [infoId: string]: StorableItemRef;
}

export interface ItemRef extends StorableItemRef {
  readonly element: HTMLElement;

  applyStyle(style: HighlightStyle): void;

  toStorable(): StorableItemRef;
}

export interface ItemRefMap {
  [infoId: string]: ItemRef;
}

export function toRef(elem: HTMLElement): ItemRef {
  if (elem instanceof HTMLElement) {
    if (elem instanceof HTMLTableCellElement)
      return new TDItemRef(elem);
    if (elem.parentElement instanceof HTMLTableCellElement)
      return new TDItemRef(elem.parentElement);
    if (elem instanceof HTMLDivElement)
      return new DivItemRef(elem);
  }

  throw new Error("unrecognized html element type");
}

export function toStorable(refs: ItemRefMap) {
  const out: StorableRefMap = {};

  for (const key in refs) {
    if (refs.hasOwnProperty(key)) {
      out[key] = refs[key].toStorable()
    }
  }

  return out;
}

/**
 * DivItemRef represents an item link/reference on a shop
 * page using the new beta layout.
 */
class DivItemRef implements ItemRef {
  readonly element: HTMLDivElement;
  readonly name: string;
  readonly stockId: string;
  readonly infoId: string;
  readonly cost: string;
  readonly inStock: string;

  constructor(field: HTMLDivElement) {
    this.element = field;
    this.name = field.children[0].getAttribute("data-name") || "";
    this.cost = field.children[0].getAttribute("data-price") || "0";
    this.inStock = (<HTMLElement>field.children[2]).innerText
      .trim()
      .split(" ", 1)[0];

    [ , this.infoId, , this.stockId ] = (<string>field.children[0].getAttribute("data-link"))
      .split(/[&=]/, 4);
  }

  applyStyle(style: HighlightStyle): void {
    this.element.style.backgroundColor = style[BG_COLOR_KEY];
    this.element.style.color = style[TXT_COLOR_KEY];
    this.element.style.opacity = style[OPACITY_KEY];
  }

  toStorable(): StorableItemRef {
    return {
      cost: this.cost,
      inStock: this.inStock,
      infoId: this.infoId,
      name: this.name,
      stockId: this.stockId,
    };
  }
}

/**
 * TDItemRef represents an item link/reference on a shop
 * page using the original layout.
 */
class TDItemRef implements ItemRef {
  readonly element: HTMLElement;
  readonly stockId: string;
  readonly infoId: string;
  readonly name: string;
  readonly cost: string;
  readonly inStock: string;

  constructor(field: HTMLTableCellElement) {
    this.element = field;

    const text = field.innerText.trim().split(/(?:\r\n|\r|\n)+/);
    this.name = text[0].trim();
    this.inStock = text[1].trim().split(" ", 1)[0];
    this.cost = text[2].trim().split(" ", 2)[0].replace(",", "");

    [ , this.infoId, , this.stockId ] = (<HTMLAnchorElement>field.querySelector("a"))
      .href
      .split(/[&=]/, 4);
  }

  applyStyle(style: HighlightStyle): void {
    this.element.style.backgroundColor = style[BG_COLOR_KEY];
    this.element.style.color = style[TXT_COLOR_KEY];
    this.element.style.opacity = style[OPACITY_KEY];
  }

  toStorable(): StorableItemRef {
    return {
      cost: this.cost,
      inStock: this.inStock,
      infoId: this.infoId,
      name: this.name,
      stockId: this.stockId,
    };
  }
}
