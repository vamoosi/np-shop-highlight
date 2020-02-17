import { writable } from "svelte/store";
import { defaultAppConfig } from "../../config/types/app-config";

const store = writable(defaultAppConfig());

