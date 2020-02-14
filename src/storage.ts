const store = chrome.storage.local;

export class Store {
  static async load(key: string): Promise<Storage> {
    return new Promise(g => store.get(key.toString(), g))
  }

  static async save(key: string, page: Object) {
    store.set({ [key]: page })
  }
}

export interface Storage {
  [ key: string ]: Object
}