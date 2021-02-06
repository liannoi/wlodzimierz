export interface Cookie<TModel> {
  read(): TModel;

  write(value: string, expires?: Date): void;

  check(): boolean;

  clear(): void;
}
