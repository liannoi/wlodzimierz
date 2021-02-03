export interface Cookie<TModel> {
  write(value: string, expires?: Date): void;

  read(): TModel;

  check(): boolean;

  clear(): void;
}
