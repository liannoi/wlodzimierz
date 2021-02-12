import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

import { Cookie } from '../models/cookie.model';

@Injectable()
export abstract class AbstractCookieService<TModel> implements Cookie<TModel> {
  protected constructor(protected name, protected service: CookieService) {
  }

  public abstract read(): TModel;

  public write(value: string, expires: Date): void {
    this.service.set(this.name, value, { path: '/', expires });
  }

  public writeExpires(value: string, shouldRemember: boolean): void {
    const date = new Date();
    const minutes = shouldRemember ? 15 : 5;
    date.setMinutes(date.getMinutes() + minutes);
    this.write(value, date);
  }

  public check(): boolean {
    return this.service.check(this.name);
  }

  public clear(): Observable<void> {
    return of(this.service.delete(this.name));
  }
}
