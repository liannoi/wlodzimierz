import { Observable } from 'rxjs';

export interface Cookie<TModel> {
  read(): TModel;

  write(value: string, expires?: Date): void;

  check(): boolean;

  clear(): Observable<void>;
}
