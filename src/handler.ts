export interface Handler {
  (): void;
}

export interface HandlerMap {
  [ url: string ]: Handler;
}