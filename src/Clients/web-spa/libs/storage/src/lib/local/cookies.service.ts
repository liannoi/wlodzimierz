import { Observable } from 'rxjs';

export interface CookiesService<TCookie> {
  read(): TCookie;

  write(value: string, expires: Date): void;

  writeExpires(value: string, shouldRemember: boolean): void;

  check(): boolean;

  clear(): Observable<void>;
}
