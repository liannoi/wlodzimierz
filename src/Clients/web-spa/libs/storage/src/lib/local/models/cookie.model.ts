import { Observable } from 'rxjs';

export interface Cookie<TModel> {
  read(): TModel;

  write(value: string, expires: Date): void;

  writeExpires(value: string, shouldRemember: boolean): void;

  check(): boolean;

  clear(): Observable<void>;
}
