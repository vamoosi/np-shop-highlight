import { Option } from "../option";

export interface BrowserStoreCB {
  (data: any): void;
}

export interface BrowserStore {
  readonly name: string;
  saveLocal<T>(key: string, value: T): Promise<any>;
  loadLocal<T>(key: string): Promise<Option<T>>;
  subscribe(key: string, fn: BrowserStoreCB): void;
  subscribe(key: Array<string>, fn: BrowserStoreCB): void;
}

export interface SubscriberMap {
  [key: string]: Array<BrowserStoreCB>
}
