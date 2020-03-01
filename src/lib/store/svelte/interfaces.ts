import { Readable, Writable } from "svelte/store";
import { AppConfig } from "../../../config/types/app-config";
import { Option } from "../../option";

export interface SvelteSubscriber {
  (c: AppConfig): void;
}

export default interface SvelteStore {
  writableStore(): Writable<AppConfig>;

  readableStore(): Readable<AppConfig>;

  get(): AppConfig;

  put(c: AppConfig): void;

  getPath(...path: Array<string>): Option<any>;

  subscribe(cb: SvelteSubscriber): number;

  unsubscribe(handle: number): void;
}