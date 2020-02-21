import { Readable, Writable } from "svelte/store";
import { AppConfig } from "../../../config/types/app-config";
import { Option } from "../../option";

export default interface ISvelteStore {
  writableStore(): Writable<AppConfig>;

  readableStore(): Readable<AppConfig>;

  get(...path: Array<string>): Option<any>;
}