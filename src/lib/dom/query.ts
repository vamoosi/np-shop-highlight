/**
 * Locates all html elements matching the given input query.
 */
export function findAll<E extends Element = Element>(query: string): NodeListOf<E> {
  return document.querySelectorAll<E>(query);
}
