export interface ObjectHandlerMap {
  readonly [route: string]: ObjectHandler;
}

export interface ObjectDetails {
  readonly id: number;
  readonly type: string;
}

export interface ObjectHandler {
  (o: ObjectDetails): void;
}